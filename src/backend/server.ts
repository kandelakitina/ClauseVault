import { Application, Context } from "./deps.ts";
import config from "./config.ts";
import authRouter from "./routes/auth.ts";

const app = new Application();

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

// Routes
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

console.log(`Server running on port ${config.port}`);

if (import.meta.main) {
  await app.listen({ port: Number(config.port) });
}

export default app;