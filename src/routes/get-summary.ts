import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getSummary(app: FastifyInstance) {
  app.get("/transactions/summary", async (_, reply) => {
    const totalIncome = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: "income",
      },
    });

    const totalOutcome = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: "outcome",
      },
    });

    const summary =
      Number(totalIncome._sum.amount) - Number(totalOutcome._sum.amount);

    return reply.status(200).send({ summary });
  });
}
