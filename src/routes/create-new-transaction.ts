import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createNewTransactions(app: FastifyInstance) {
  app.post("/transactions", async (request, reply) => {
    const transactionSchema = z.object({
      title: z.string().min(4, {
        message:
          "O título da transação precisa conter pelo menos 4 caracteres.",
      }),
      amount: z.number(),
      type: z.enum(["income", "outcome"]),
    });

    const { title, amount, type } = transactionSchema.parse(request.body);

    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount,
        type,
      },
    });

    return reply.status(201).send({ transactionId: transaction.id });
  });
}
