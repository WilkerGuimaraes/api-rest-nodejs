import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../app";
import { prisma } from "../lib/prisma";

describe("Get Summary", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany();
    await app.close();
  });

  it("should return summary value", async () => {
    const incomeTransactions = [
      { title: "Freelancer job", amount: 10000, type: "income" },
    ];

    const outcomeTransactions = [
      { title: "Notebook", amount: 8000, type: "outcome" },
    ];

    await prisma.transaction.createMany({
      data: [...incomeTransactions, ...outcomeTransactions],
    });

    const response = await request(app.server)
      .get("/transactions/summary")
      .send();

    expect(response.status).toBe(200);

    const totalIncome = incomeTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    const totalOutcome = outcomeTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    const expectedSummary = totalIncome - totalOutcome;

    expect(expectedSummary).toBe(2000);
  });
});
