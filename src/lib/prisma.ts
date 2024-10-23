import { PrismaClient } from "@prisma/client";
import { env } from "../env.js";

export const prisma = new PrismaClient({
  log: ["query"],
});

console.log(`Conectando ao banco de dados em: ${env.data?.DATABASE_URL}`);
