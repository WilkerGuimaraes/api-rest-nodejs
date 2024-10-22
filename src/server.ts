import fastify from "fastify";
import { createNewTransactions } from "./routes/create-new-transaction";

const app = fastify();

app.register(createNewTransactions);

app.listen({ port: 3333 }).then(() => console.log("HTTP Server running!"));
