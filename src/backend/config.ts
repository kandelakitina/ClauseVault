// Configuration settings for the backend
const config = {
  port: Deno.env.get("PORT") || 8000,
  databaseUrl: Deno.env.get("DATABASE_URL") || "mongodb://localhost:27017/clausevault",
  jwtSecret: Deno.env.get("JWT_SECRET") || "fallback_jwt_secret_for_dev",
  jwtExpiry: "15m", // 15 minutes for access token
  refreshTokenExpiry: "7d", // 7 days for refresh token
};

export default config;