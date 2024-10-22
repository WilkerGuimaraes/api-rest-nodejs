import fastify from "fastify";
import { createNewTransactions } from "./routes/create-new-transaction";
import { getTransactions } from "./routes/get-transactions";

const app = fastify();

app.register(createNewTransactions);
app.register(getTransactions);

app.listen({ port: 3333 }).then(() => console.log("HTTP Server running!"));
