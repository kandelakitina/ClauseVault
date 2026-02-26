import { Context } from "../deps.ts";
import { verifyToken } from "../utils/auth.ts";

export async function authMiddleware(ctx: Context, next: () => Promise<unknown>) {
  try {
    // Extract token from Authorization header
    const authHeader = ctx.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Authorization header missing or invalid" };
      return;
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    const tokenData = await verifyToken(token);

    if (!tokenData) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid or expired token" };
      return;
    }

    // Attach user info to context
    ctx.state.userId = tokenData.userId;

    // Continue to next middleware/route
    await next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
}