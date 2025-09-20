import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // user, admin, owner
  createdAt: timestamp("created_at").defaultNow(),
});

export const donations = pgTable("donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  donorName: text("donor_name").notNull(),
  donorEmail: text("donor_email").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  paymentMethod: text("payment_method").notNull(), // stripe, paypal, gcash
  paymentStatus: text("payment_status").notNull().default("pending"), // pending, completed, failed
  donationType: text("donation_type").notNull().default("one-time"), // one-time, monthly, sponsorship
  isAnonymous: boolean("is_anonymous").default(false),
  referenceNumber: text("reference_number"), // For GCash
  senderNumber: text("sender_number"), // For GCash
  stripePaymentIntentId: text("stripe_payment_intent_id"), // For Stripe
  paypalOrderId: text("paypal_order_id"), // For PayPal
  metadata: jsonb("metadata"), // Additional payment data
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  inquiryType: text("inquiry_type").notNull(), // sponsorship, donation, volunteer, partnership, general
  message: text("message").notNull(),
  subscribeUpdates: boolean("subscribe_updates").default(false),
  status: text("status").notNull().default("unread"), // unread, read, replied
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  role: true,
});

export const insertDonationSchema = createInsertSchema(donations).pick({
  donorName: true,
  donorEmail: true,
  amount: true,
  currency: true,
  paymentMethod: true,
  donationType: true,
  isAnonymous: true,
  referenceNumber: true,
  senderNumber: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  firstName: true,
  lastName: true,
  email: true,
  subject: true,
  inquiryType: true,
  message: true,
  subscribeUpdates: true,
});

export const insertSessionSchema = createInsertSchema(sessions).pick({
  userId: true,
  expiresAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
