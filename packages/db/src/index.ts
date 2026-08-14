// packages/db/client.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Only needed in dev/monorepo — in prod, env vars should come from the
// platform (Docker, Railway, Vercel, etc.), not a .env file.
if (process.env.NODE_ENV !== "production") {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  dotenv.config({ path: path.resolve(dirname, "../.env") });
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString,

});

// --- Singleton pattern ---
// Prevents creating a new PrismaClient (and new DB connections) on every
// hot-reload during dev. In prod there's only ever one instance anyway
// since the process doesn't hot-reload, but this pattern is harmless there.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const client =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = client;
}