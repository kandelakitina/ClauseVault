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
  private static readonly collection = db.collection<User>("users");

  // Create index for email uniqueness
  static async createIndexes() {
    try {
      await this.collection.createIndex({ email: 1 }, { unique: true });
    } catch (error) {
      console.warn("Could not create index, might already exist:", error);
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
    return await this.collection.findOne({ email });
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
  }

  static async updateLastLogin(userId: ObjectId): Promise<void> {
    await this.collection.updateOne(
      { _id: userId },
      { $set: { lastLoginAt: new Date() } }
    );
  }

  static async findById(id: string): Promise<User | undefined> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }
}

// Create indexes on module load
await UserModel.createIndexes();

export default UserModel;