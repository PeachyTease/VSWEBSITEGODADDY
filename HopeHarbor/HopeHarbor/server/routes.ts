import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDonationSchema, insertContactMessageSchema, insertUserSchema, insertSessionSchema } from "@shared/schema";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
}) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // PayPal routes
  app.get("/api/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/api/paypal/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/api/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  // Stripe routes
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ message: "Stripe not configured" });
      }

      const { amount, currency = "USD", donationId } = req.body;
      
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(parseFloat(amount) * 100), // Convert to cents
        currency: currency.toLowerCase(),
        metadata: {
          donationId: donationId || "",
        },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password, portal } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check portal access
      if (portal === "admin" && user.role !== "admin" && user.role !== "owner") {
        return res.status(403).json({ message: "Access denied to admin portal" });
      }
      if (portal === "owner" && user.role !== "owner") {
        return res.status(403).json({ message: "Access denied to owner portal" });
      }

      // Create session
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour session

      const session = await storage.createSession({
        userId: user.id,
        expiresAt,
      });

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        sessionId: session.id,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    try {
      const sessionId = req.headers.authorization?.replace("Bearer ", "");
      if (sessionId) {
        await storage.deleteSession(sessionId);
      }
      res.json({ message: "Logged out successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Logout failed" });
    }
  });

  // Donation routes
  app.post("/api/donations", async (req, res) => {
    try {
      const donationData = insertDonationSchema.parse(req.body);
      const donation = await storage.createDonation(donationData);
      res.status(201).json(donation);
    } catch (error: any) {
      console.error("Error creating donation:", error);
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/donations", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const donations = await storage.getDonations(limit, offset);
      res.json(donations);
    } catch (error: any) {
      console.error("Error fetching donations:", error);
      res.status(500).json({ message: "Failed to fetch donations" });
    }
  });

  app.get("/api/donations/:id", async (req, res) => {
    try {
      const donation = await storage.getDonation(req.params.id);
      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }
      res.json(donation);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch donation" });
    }
  });

  app.patch("/api/donations/:id", async (req, res) => {
    try {
      const updates = req.body;
      const donation = await storage.updateDonation(req.params.id, updates);
      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }
      res.json(donation);
    } catch (error: any) {
      console.error("Error updating donation:", error);
      res.status(500).json({ message: "Failed to update donation" });
    }
  });

  app.get("/api/donations-stats", async (req, res) => {
    try {
      const stats = await storage.getDonationStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch donation stats" });
    }
  });

  // GCash verification routes
  app.get("/api/gcash/pending", async (req, res) => {
    try {
      const pendingPayments = await storage.getDonationsByStatus("pending");
      const gcashPayments = pendingPayments.filter(d => d.paymentMethod === "gcash");
      res.json(gcashPayments);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch pending GCash payments" });
    }
  });

  app.patch("/api/gcash/:id/verify", async (req, res) => {
    try {
      const { status } = req.body; // "completed" or "failed"
      const donation = await storage.updateDonation(req.params.id, {
        paymentStatus: status === "verified" ? "completed" : "failed",
      });
      
      if (!donation) {
        return res.status(404).json({ message: "Payment not found" });
      }
      
      res.json(donation);
    } catch (error: any) {
      console.error("Error verifying GCash payment:", error);
      res.status(500).json({ message: "Failed to verify payment" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.status(201).json(message);
    } catch (error: any) {
      console.error("Error creating contact message:", error);
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const messages = await storage.getContactMessages(limit, offset);
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.patch("/api/contact/:id", async (req, res) => {
    try {
      const updates = req.body;
      const message = await storage.updateContactMessage(req.params.id, updates);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json(message);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to update message" });
    }
  });

  // Admin stats route
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const donationStats = await storage.getDonationStats();
      const unreadMessages = await storage.getUnreadMessagesCount();
      const pendingGCash = await storage.getDonationsByStatus("pending");
      const gcashPending = pendingGCash.filter(d => d.paymentMethod === "gcash").length;

      res.json({
        totalDonations: donationStats.totalAmount,
        donationCount: donationStats.totalCount,
        pendingMessages: unreadMessages,
        pendingGCashPayments: gcashPending,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
