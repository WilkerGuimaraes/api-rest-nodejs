import fastify from "fastify";
import { createNewTransactions } from "./routes/create-new-transaction";
import { getTransactions } from "./routes/get-transactions";
import { getTransactionById } from "./routes/get-transaction-by-id";
import { getSummary } from "./routes/get-summary";

const app = fastify();

app.register(createNewTransactions);
app.register(getTransactions);
app.register(getTransactionById);
app.register(getSummary);

app.listen({ port: 3333 }).then(() => console.log("HTTP Server running!"));
