import { Router, Context, z } from "../deps.ts";
import User from "../models/User.ts";
import { generateToken } from "../utils/auth.ts";

const router = new Router();

// Zod schemas for validation
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

// Register endpoint
router.post("/auth/register", async (ctx: Context) => {
  try {
    const body = await ctx.request.body({ type: "json" }).value;
    
    // Validate input
    const validatedData = registerSchema.parse(body);
    const { email, password } = validatedData;
    
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      ctx.response.status = 409;
      ctx.response.body = { error: "User with this email already exists" };
      return;
    }
    
    // Create new user
    const userId = await User.create({ email, password });
    
    // Generate tokens
    const accessToken = await generateToken(userId.toString(), "15m");
    const refreshToken = await generateToken(userId.toString(), "7d");
    
    // Set refresh token in httpOnly cookie
    ctx.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    
    ctx.response.status = 201;
    ctx.response.body = {
      message: "User registered successfully",
      user: { id: userId, email },
      accessToken,
    };
  } catch (err: unknown) {
    const error = err as Error;
    if (error.constructor.name === 'ZodError') {
      const zodError = error as z.ZodError;
      ctx.response.status = 400;
      ctx.response.body = { error: "Validation failed", details: zodError.errors };
    } else {
      console.error("Registration error:", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal server error" };
    }
  }
});

// Login endpoint
router.post("/auth/login", async (ctx: Context) => {
  try {
    const body = await ctx.request.body({ type: "json" }).value;
    
    // Validate input
    const validatedData = loginSchema.parse(body);
    const { email, password } = validatedData;
    
    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid email or password" };
      return;
    }
    
    // Verify password
    const isValidPassword = await User.verifyPassword(password, user.password);
    if (!isValidPassword) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid email or password" };
      return;
    }
    
    // Update last login
    await User.updateLastLogin(user._id);
    
    // Generate tokens
    const accessToken = await generateToken(user._id.toString(), "15m");
    const refreshToken = await generateToken(user._id.toString(), "7d");
    
    // Set refresh token in httpOnly cookie
    ctx.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Login successful",
      user: { id: user._id, email: user.email },
      accessToken,
    };
  } catch (err: unknown) {
    const error = err as Error;
    if (error.constructor.name === 'ZodError') {
      const zodError = error as z.ZodError;
      ctx.response.status = 400;
      ctx.response.body = { error: "Validation failed", details: zodError.errors };
    } else {
      console.error("Login error:", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal server error" };
    }
  }
});

// Logout endpoint
router.post("/auth/logout", async (ctx: Context) => {
  try {
    // Clear refresh token cookie
    ctx.cookies.delete("refreshToken");
    
    ctx.response.status = 200;
    ctx.response.body = { message: "Logout successful" };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Logout error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

export default router;