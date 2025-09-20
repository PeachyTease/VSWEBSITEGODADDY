import { type User, type InsertUser, type Donation, type InsertDonation, type ContactMessage, type InsertContactMessage, type Session, type InsertSession } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Sessions
  createSession(session: InsertSession): Promise<Session>;
  getSession(id: string): Promise<Session | undefined>;
  deleteSession(id: string): Promise<void>;
  getUserBySesssionId(sessionId: string): Promise<User | undefined>;

  // Donations
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonation(id: string): Promise<Donation | undefined>;
  updateDonation(id: string, updates: Partial<Donation>): Promise<Donation | undefined>;
  getDonations(limit?: number, offset?: number): Promise<Donation[]>;
  getDonationsByStatus(status: string): Promise<Donation[]>;
  getDonationStats(): Promise<{
    totalAmount: number;
    totalCount: number;
    pendingCount: number;
  }>;

  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  updateContactMessage(id: string, updates: Partial<ContactMessage>): Promise<ContactMessage | undefined>;
  getContactMessages(limit?: number, offset?: number): Promise<ContactMessage[]>;
  getUnreadMessagesCount(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private donations: Map<string, Donation> = new Map();
  private contactMessages: Map<string, ContactMessage> = new Map();
  private sessions: Map<string, Session> = new Map();

  constructor() {
    // Create default admin and owner users
    this.createDefaultUsers();
  }

  private async createDefaultUsers() {
    const adminUser: User = {
      id: randomUUID(),
      username: "admin",
      email: "admin@handswithcare.org",
      password: "admin123", // In production, this would be hashed
      role: "admin",
      createdAt: new Date(),
    };

    const ownerUser: User = {
      id: randomUUID(),
      username: "owner",
      email: "owner@handswithcare.org",
      password: "owner123", // In production, this would be hashed
      role: "owner",
      createdAt: new Date(),
    };

    this.users.set(adminUser.id, adminUser);
    this.users.set(ownerUser.id, ownerUser);
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      role: insertUser.role || "user",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Sessions
  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = randomUUID();
    const session: Session = {
      ...insertSession,
      id,
      createdAt: new Date(),
    };
    this.sessions.set(id, session);
    return session;
  }

  async getSession(id: string): Promise<Session | undefined> {
    const session = this.sessions.get(id);
    if (session && session.expiresAt < new Date()) {
      this.sessions.delete(id);
      return undefined;
    }
    return session;
  }

  async deleteSession(id: string): Promise<void> {
    this.sessions.delete(id);
  }

  async getUserBySesssionId(sessionId: string): Promise<User | undefined> {
    const session = await this.getSession(sessionId);
    if (!session) return undefined;
    return this.getUser(session.userId);
  }

  // Donations
  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = randomUUID();
    const donation: Donation = {
      ...insertDonation,
      id,
      currency: insertDonation.currency || "USD",
      donationType: insertDonation.donationType || "one-time",
      paymentStatus: "pending",
      metadata: null,
      stripePaymentIntentId: null,
      paypalOrderId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.donations.set(id, donation);
    return donation;
  }

  async getDonation(id: string): Promise<Donation | undefined> {
    return this.donations.get(id);
  }

  async updateDonation(id: string, updates: Partial<Donation>): Promise<Donation | undefined> {
    const donation = this.donations.get(id);
    if (!donation) return undefined;
    
    const updatedDonation = { ...donation, ...updates, updatedAt: new Date() };
    this.donations.set(id, updatedDonation);
    return updatedDonation;
  }

  async getDonations(limit = 50, offset = 0): Promise<Donation[]> {
    const donations = Array.from(this.donations.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(offset, offset + limit);
    return donations;
  }

  async getDonationsByStatus(status: string): Promise<Donation[]> {
    return Array.from(this.donations.values())
      .filter(donation => donation.paymentStatus === status)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getDonationStats(): Promise<{
    totalAmount: number;
    totalCount: number;
    pendingCount: number;
  }> {
    const donations = Array.from(this.donations.values());
    const completedDonations = donations.filter(d => d.paymentStatus === "completed");
    const totalAmount = completedDonations.reduce((sum, d) => sum + parseFloat(d.amount), 0);
    const totalCount = donations.length;
    const pendingCount = donations.filter(d => d.paymentStatus === "pending").length;

    return { totalAmount, totalCount, pendingCount };
  }

  // Contact Messages
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      status: "unread",
      subscribeUpdates: insertMessage.subscribeUpdates ?? false,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async updateContactMessage(id: string, updates: Partial<ContactMessage>): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, ...updates };
    this.contactMessages.set(id, updatedMessage);
    return updatedMessage;
  }

  async getContactMessages(limit = 50, offset = 0): Promise<ContactMessage[]> {
    const messages = Array.from(this.contactMessages.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(offset, offset + limit);
    return messages;
  }

  async getUnreadMessagesCount(): Promise<number> {
    return Array.from(this.contactMessages.values())
      .filter(message => message.status === "unread").length;
  }
}

export const storage = new MemStorage();
