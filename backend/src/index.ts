import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { createConnection, Connection } from "typeorm";
import { schema } from "./schema";
import dotenv from "dotenv";
import { createModel } from "./model";

dotenv.config();

export type Ctx = ReturnType<typeof createModel> & {
    connection: Connection;
};

createConnection().then(connection => {
    const server = new ApolloServer({
        schema,
        context: { connection, ...createModel(connection) }
    });

    server.listen(4001).then(() => {
        console.log(`🚀  Server ready at http://localhost:4001`);
    });
});
