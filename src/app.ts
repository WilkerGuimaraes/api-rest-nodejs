import fastify from "fastify";
import { createNewTransactions } from "./routes/create-new-transaction";
import { getTransactions } from "./routes/get-transactions";
import { getTransactionById } from "./routes/get-transaction-by-id";
import { getSummary } from "./routes/get-summary";

export const app = fastify();

app.register(createNewTransactions);
app.register(getTransactions);
app.register(getTransactionById);
app.register(getSummary);
