import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "../config/config.js";

const globalForPrisma = globalThis;
const adapter = new PrismaPg({ connectionString: config.DATABASE_URL });

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
    adapter,
  });

if (config.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
