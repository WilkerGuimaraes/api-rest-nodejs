import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../app";
import { prisma } from "../lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

describe("Create New Transaction", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany();
    await app.close();
  });

  it("should create new transaction", async () => {
    const newTransaction = {
      title: "Freelancer Job",
      amount: 5000,
      type: "income",
    };

    const response = await request(app.server)
      .post("/transactions")
      .send(newTransaction);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("transactionId");

    const transactionInDb = await prisma.transaction.findFirst({
      where: { title: "Freelancer Job" },
    });

    expect(transactionInDb).not.toBeNull();

    const transactionAmount = (transactionInDb?.amount as Decimal).toNumber();
    expect(transactionAmount).toBe(5000);
    expect(transactionInDb?.type).toBe("income");
  });

  it("should return error handling when title property is less than 4 characters", async () => {
    const invalidTransaction = {
      title: "abc",
      amount: 100,
      type: "income",
    };

    const response = await request(app.server)
      .post("/transactions")
      .send(invalidTransaction);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "O título da transação precisa conter pelo menos 4 caracteres."
    );
  });
});
