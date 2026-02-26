// Centralized dependency management for the backend
import { Application, Router, Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { MongoClient, ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { compare, hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { SignJWT, jwtVerify } from "https://deno.land/x/jose@v5.2.0/index.ts";

export { Application, Router, Context, MongoClient, ObjectId, compare, hash, z, SignJWT, jwtVerify };