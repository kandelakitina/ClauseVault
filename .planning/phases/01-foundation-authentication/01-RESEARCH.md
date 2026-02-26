# Phase 1: Foundation & Authentication - Research

**Researched:** 2026-02-26
**Domain:** Deno backend, MongoDB database, Svelte frontend, authentication
**Confidence:** MEDIUM

## Summary

Phase 1 establishes the foundational infrastructure for ClauseVault with secure user authentication. The research identifies key technologies: Oak framework for Deno backend with OpenAPI documentation, MongoDB for user data storage with bcrypt password hashing, and SvelteKit for responsive frontend. Key considerations include JWT-based session management, secure password handling, and responsive design patterns compatible with the drag-and-drop interface planned for later phases.

**Primary recommendation:** Use Oak + Opine for Deno REST API with MongoDB Atlas, implement JWT authentication with refresh tokens, and establish SvelteKit with Tailwind CSS for responsive design.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Oak | ^12.0.0 | Deno web framework | Official Deno middleware framework, mature ecosystem |
| MongoDB | ^4.0.0 | Database storage | Matches project decision, excellent for document-based user data |
| SvelteKit | ^2.0.0 | Frontend framework | Latest Svelte with routing, SSR capabilities |
| bcrypt | latest | Password hashing | Industry standard for password security |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| zod | latest | Input validation | Validate API requests/responses |
| jose | latest | JWT handling | Secure token generation/verification |
| svelte-use | latest | Utility functions | Responsive design helpers |
| tailwindcss | latest | Styling | Responsive utility-first CSS |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Oak | Opine, Alosaur | Oak has better documentation and community support |
| bcrypt | scrypt, argon2 | bcrypt is most widely adopted and tested |
| Tailwind | Bootstrap, Bulma | Tailwind integrates better with Svelte and enables responsive design |

**Installation:**
```bash
# Deno dependencies handled via import maps
# SvelteKit setup
npm create svelte@latest frontend
cd frontend
npm install
npm install -D @sveltejs/adapter-auto
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── backend/           # Deno API server
│   ├── routes/        # Authentication and API routes
│   ├── models/        # User model and database schemas  
│   ├── middleware/    # Auth, validation, error handling
│   └── utils/         # Helper functions
├── frontend/          # SvelteKit application
│   ├── src/
│   │   ├── lib/       # Shared components
│   │   ├── routes/    # Page routes
│   │   └── app.html   # Base template
│   └── static/        # Static assets
└── docs/              # OpenAPI specifications
    └── openapi.yaml   # API documentation
```

### Pattern 1: Authentication Middleware
**What:** Centralized authentication logic applied to protected routes
**When to use:** For any endpoint requiring user authentication
**Example:**
```typescript
// Backend with Oak
import { Router, Context } from "https://deno.land/x/oak/mod.ts";

const authMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  const authHeader = ctx.request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }
  
  const token = authHeader.substring(7);
  // Verify JWT token here
  try {
    // Extract user from token and attach to context
    await next();
  } catch (err) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid token" };
  }
};
```

### Pattern 2: User Registration Flow
**What:** Secure user registration with validation and password hashing
**When to use:** For AUTH-01 requirement
**Example:**
```typescript
// Register endpoint
router.post("/auth/register", async (ctx) => {
  const { email, password } = await ctx.request.body({ type: "json" }).value;
  
  // Validate input with zod
  const result = registrationSchema.safeParse({ email, password });
  if (!result.success) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid input", details: result.error.issues };
    return;
  }
  
  // Check if user exists
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    ctx.response.status = 409;
    ctx.response.body = { error: "User already exists" };
    return;
  }
  
  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password);
  const newUser = {
    email,
    password: hashedPassword,
    createdAt: new Date(),
    lastLogin: null
  };
  
  const insertResult = await db.collection("users").insertOne(newUser);
  ctx.response.status = 201;
  ctx.response.body = { id: insertResult.insertedId, email };
});
```

### Anti-Patterns to Avoid
- **Storing passwords in plain text:** Always hash with bcrypt or similar
- **Short-lived JWTs without refresh tokens:** Causes poor UX with constant re-logins
- **Insecure CORS settings:** Lock down origins in production

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Password hashing | Custom encryption | bcrypt/scrypt | Cryptographic implementations are complex and error-prone |
| JWT token generation/validation | Homegrown tokens | jose library | Security vulnerabilities in custom implementations |
| Input validation | Manual checks | zod/yup | Complex validation logic with edge cases |
| Session management | In-memory sessions | JWT with refresh tokens | Scalability and security concerns |
| OpenAPI documentation | Manual docs | Zod OpenAPI generator | Error-prone and hard to keep in sync |

**Key insight:** Authentication systems have subtle security implications that are easy to get wrong. Leverage battle-tested libraries for security-critical components.

## Common Pitfalls

### Pitfall 1: Improper Input Sanitization
**What goes wrong:** SQL injection, XSS attacks through unsanitized inputs
**Why it happens:** Developers underestimate importance of input validation
**How to avoid:** Use Zod for schema validation on all API inputs; never trust client data
**Warning signs:** Direct insertion of request values into database queries

### Pitfall 2: Weak Password Storage
**What goes wrong:** Passwords exposed in case of data breach
**Why it happens:** Not using proper hashing algorithms or salt generation
**How to avoid:** Always use bcrypt, scrypt, or argon2 with appropriate rounds
**Warning signs:** Plain text passwords, simple hash functions like MD5/SHA1

### Pitfall 3: Token Security Issues
**What goes wrong:** Session hijacking, unauthorized access
**Why it happens:** Poor token management, weak secrets, insufficient validation
**How to avoid:** Use strong secrets, proper expiration, secure cookie attributes
**Warning signs:** Long-lived tokens, predictable token values

### Pitfall 4: CORS Misconfiguration
**What goes wrong:** Cross-site request forgery, data leakage
**Why it happens:** Overly permissive CORS settings in production
**How to avoid:** Restrict origins, methods, and headers appropriately
**Warning signs:** Wildcard origins in production environments

## Code Examples

Verified patterns from official sources:

### User Registration Endpoint
```typescript
import { Router } from "https://deno.land/x/oak/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { z } from "https://deno.land/x/zod/mod.ts";

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

const router = new Router();

router.post("/auth/register", async (ctx) => {
  try {
    const body = await ctx.request.body({ type: "json" }).value;
    const result = registrationSchema.safeParse(body);
    
    if (!result.success) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Invalid input", details: result.error.issues };
      return;
    }
    
    const { email, password } = result.data;
    
    // Check if user exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      ctx.response.status = 409;
      ctx.response.body = { error: "User already exists" };
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password);
    
    // Create user
    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
      lastLogin: null
    };
    
    const insertResult = await db.collection("users").insertOne(newUser);
    
    ctx.response.status = 201;
    ctx.response.body = { id: insertResult.insertedId, email };
  } catch (error) {
    console.error("Registration error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});
```

### JWT Token Generation
```typescript
import { SignJWT, jwtVerify } from "https://deno.land/x/jose@v4.14.4/index.ts";

async function generateTokens(userId: string) {
  const secret = new TextEncoder().encode(Deno.env.get("JWT_SECRET"));
  
  // Access token (short-lived)
  const accessToken = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
  
  // Refresh token (longer-lived)
  const refreshToken = await new SignJWT({ userId, type: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
  
  return { accessToken, refreshToken };
}

async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(Deno.env.get("JWT_SECRET"));
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
```

### SvelteKit Authentication Store
```typescript
// src/lib/stores/auth.ts
import { writable } from 'svelte/store';

export const auth = writable({
  isAuthenticated: false,
  user: null,
  token: null
});

export function login(credentials) {
  // Call auth API and update store
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      auth.set({
        isAuthenticated: true,
        user: data.user,
        token: data.token
      });
    }
    return data;
  });
}

export function logout() {
  localStorage.removeItem('token');
  auth.set({
    isAuthenticated: false,
    user: null,
    token: null
  });
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Cookie sessions | JWT tokens | 2015+ | Better scalability for microservices |
| Basic auth only | OAuth/social options | 2018+ | Improved UX and security |
| Manual API docs | OpenAPI/Swagger gen | 2020+ | Self-documenting, easier testing |

**Deprecated/outdated:**
- LocalStorage for sensitive tokens: Vulnerable to XSS attacks
- Simple SHA-256 for passwords: Insufficient for modern security

## Open Questions

1. **Refresh token storage approach**
   - What we know: JWT access tokens expire frequently for security
   - What's unclear: Whether to store refresh tokens in HttpOnly cookies vs. secure localStorage
   - Recommendation: Implement with HttpOnly cookies for better security

2. **Database indexing strategy**
   - What we know: Email field needs to be indexed for login performance
   - What's unclear: Additional indexes needed for future features
   - Recommendation: Start with email uniqueness index, expand as needed

3. **Rate limiting implementation**
   - What we know: Prevents brute force attacks
   - What's unclear: Specific implementation for Deno/Oak
   - Recommendation: Implement using Redis or memory store, consider rate limits for login attempts

## Sources

### Primary (MEDIUM confidence)
- Deno Oak framework documentation and examples
- MongoDB Deno driver documentation
- SvelteKit official documentation
- Industry standard authentication patterns (JWT, bcrypt)

### Secondary (MEDIUM confidence)
- Deno standard library patterns
- OWASP authentication security guidelines
- OpenAPI specification best practices

### Tertiary (LOW confidence)
- General web authentication tutorials (require verification)

## Metadata

**Confidence breakdown:**
- Standard stack: MEDIUM - Based on current Deno ecosystem knowledge
- Architecture: MEDIUM - Following proven patterns adapted for Deno
- Pitfalls: HIGH - Well-documented security best practices
- Validation: MEDIUM - Based on general API testing principles

**Research date:** 2026-02-26
**Valid until:** 2026-03-26 (30 days for stable technologies)