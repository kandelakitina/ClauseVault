import { Application, Context, Router } from "./deps.ts";
import config from "./config.ts";
import authRouter from "./routes/auth.ts";
import { authMiddleware } from "./middleware/auth.ts";

const app = new Application();
const apiRouter = new Router();

// Middleware
app.use(async (ctx: Context, next: () => Promise<unknown>) => {
  await next();
  // Log requests
  console.log(`${new Date().toISOString()} - ${ctx.request.method} ${ctx.request.url}`);
});

// CORS middleware
app.use(async (ctx: Context, next: () => Promise<unknown>) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 200;
  } else {
    await next();
  }
});

// Example protected route
apiRouter.get("/api/protected", authMiddleware, (ctx: Context) => {
  ctx.response.body = { 
    message: "This is a protected route",
    userId: ctx.state.userId
  };
});

// Routes
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

console.log(`Server running on port ${config.port}`);

if (import.meta.main) {
  await app.listen({ port: Number(config.port) });
}

export default app;