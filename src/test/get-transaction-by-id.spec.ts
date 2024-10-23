import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../app";
import { prisma } from "../lib/prisma";
import { Transaction } from "@prisma/client";

describe("Get Transaction By Id", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany();
    await app.close();
  });

  it("should return the transactions by it's ID", async () => {
    const createdTransaction = await prisma.transaction.create({
      data: {
        title: "Freelance job",
        amount: 5000,
        type: "income",
      },
    });

    const response = await request(app.server)
      .get(`/transactions/${createdTransaction.id}`)
      .send();

    const transaction: Transaction = {
      ...response.body.transaction,
      amount: Number(response.body.transaction.amount),
    };

    expect(response.status).toBe(200);
    expect(transaction).toMatchObject({
      id: createdTransaction.id,
      title: "Freelance job",
      amount: 5000,
      type: "income",
    });

    console.log(response.body.transaction);
  });
});
