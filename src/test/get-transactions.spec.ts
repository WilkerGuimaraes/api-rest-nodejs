import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../app";
import { prisma } from "../lib/prisma";
import { Transaction } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { execSync } from "child_process";

describe("Get Transactions", () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(async () => {
    execSync("npx prisma migrate reset --force");
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return all transactions", async () => {
    await prisma.transaction.createMany({
      data: [
        { title: "Notebook", amount: 8000, type: "outcome" },
        { title: "Freelancer Job", amount: 5000, type: "income" },
      ],
    });

    const response = await request(app.server).get("/transactions").send();

    expect(response.status).toBe(200);
    expect(response.body.transactions.length).toBe(2);

    const transactions = response.body.transactions.map(
      (transaction: Transaction) => ({
        ...transaction,
        amount: new Decimal(transaction.amount).toNumber(),
      })
    );

    expect(transactions[0]).toMatchObject({
      title: "Notebook",
      amount: 8000,
      type: "outcome",
    });
    expect(transactions[1]).toMatchObject({
      title: "Freelancer Job",
      amount: 5000,
      type: "income",
    });
  });
});
