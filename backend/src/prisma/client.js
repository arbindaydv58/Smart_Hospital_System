import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "../config/config.js";

const globalForPrisma = globalThis;
const adapter = new PrismaPg({ connectionString: config.DATABASE_URL });
const prismaLogLevels =
  config.NODE_ENV === "production"
    ? ["error"]
    : ["query", "info", "warn", "error"];

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: prismaLogLevels,
    adapter,
  });

if (config.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
