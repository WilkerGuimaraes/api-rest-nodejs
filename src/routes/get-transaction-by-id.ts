import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getTransactionById(app: FastifyInstance) {
  app.get("/transactions/:id", async (request, reply) => {
    const transactionSchema = z.object({
      id: z.string(),
    });

    const { id } = transactionSchema.parse(request.params);

    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    return reply.status(200).send({ transaction });
  });
}
