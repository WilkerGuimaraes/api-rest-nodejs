import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getTransactions(app: FastifyInstance) {
  app.get("/transactions", async (_, reply) => {
    const transactions = await prisma.transaction.findMany({});

    return reply.status(200).send({ transactions });
  });
}
