import { SignJWT, jwtVerify } from "../deps.ts";
import config from "../config.ts";

// Generate JWT token
export async function generateToken(userId: string, expiresIn: string = config.jwtExpiry): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + (expiresIn.includes('m') 
    ? parseInt(expiresIn) * 60 
    : expiresIn.includes('h') 
      ? parseInt(expiresIn) * 60 * 60 
      : expiresIn.includes('d') 
        ? parseInt(expiresIn) * 24 * 60 * 60 
        : 900); // default to 15 minutes (900 seconds)

  const jwt = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setIssuer("clausevault")
    .setAudience("clausevault-users")
    .sign(new TextEncoder().encode(config.jwtSecret));

  return jwt;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(config.jwtSecret)
    );
    
    return { userId: (verified.payload.userId as string) || "" };
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}