import { users, portraits, type User, type InsertUser, type Portrait, type InsertPortrait } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPortrait(id: number): Promise<Portrait | undefined>;
  createPortrait(portrait: InsertPortrait): Promise<Portrait>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portraits: Map<number, Portrait>;
  private currentUserId: number;
  private currentPortraitId: number;

  constructor() {
    this.users = new Map();
    this.portraits = new Map();
    this.currentUserId = 1;
    this.currentPortraitId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPortrait(id: number): Promise<Portrait | undefined> {
    return this.portraits.get(id);
  }

  async createPortrait(insertPortrait: InsertPortrait): Promise<Portrait> {
    const id = this.currentPortraitId++;
    const portrait: Portrait = { 
      ...insertPortrait, 
      id,
      extraDetails: insertPortrait.extraDetails || null,
      createdAt: new Date().toISOString()
    };
    this.portraits.set(id, portrait);
    return portrait;
  }
}

export const storage = new MemStorage();
