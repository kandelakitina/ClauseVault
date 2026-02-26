import { ObjectId, compare, hash } from "../deps.ts";
import { db } from "../utils/db.ts";

interface User {
  _id?: ObjectId;
  email: string;
  password: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

class UserModel {
  private static collection: any;
  
  // Initialize the collection
  static async initializeCollection() {
    try {
      // Attempt to get the collection, but handle gracefully if DB is unavailable
      if (db && typeof db.collection === 'function') {
        this.collection = db.collection("users");
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.warn("Could not initialize user collection:", err.message || err);
      // Create a mock collection that will throw errors when used
      this.collection = {
        findOne: () => Promise.resolve(undefined),
        insertOne: () => { throw new Error("Database not available"); },
        createIndex: () => Promise.resolve(),
        updateOne: () => { throw new Error("Database not available"); }
      };
    }
  }

  // Create index for email uniqueness
  static async createIndexes() {
    try {
      if (this.collection && typeof this.collection.createIndex === 'function') {
        await this.collection.createIndex({ email: 1 }, { unique: true });
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.warn("Could not create index, might already exist:", err.message || err);
    }
  }

  static async create(userData: { email: string; password: string }): Promise<ObjectId> {
    // Hash password
    const hashedPassword = await hash(userData.password);
    
    const user: User = {
      email: userData.email,
      password: hashedPassword,
      createdAt: new Date(),
    };
    
    const userId = await this.collection.insertOne(user);
    return userId;
  }

  static async findByEmail(email: string): Promise<User | undefined> {
    if (!this.collection || typeof this.collection.findOne !== 'function') {
      throw new Error("Database not available");
    }
    return await this.collection.findOne({ email });
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
  }

  static async updateLastLogin(userId: ObjectId): Promise<void> {
    if (!this.collection || typeof this.collection.updateOne !== 'function') {
      throw new Error("Database not available");
    }
    await this.collection.updateOne(
      { _id: userId },
      { $set: { lastLoginAt: new Date() } }
    );
  }

  static async findById(id: string): Promise<User | undefined> {
    if (!this.collection || typeof this.collection.findOne !== 'function') {
      throw new Error("Database not available");
    }
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }
}

// Initialize the collection and create indexes on module load
try {
  await UserModel.initializeCollection();
  await UserModel.createIndexes();
} catch (error) {
  console.warn("Could not initialize User model:", error);
}

export default UserModel;