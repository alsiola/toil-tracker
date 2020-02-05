import { makeExecutableSchema } from "graphql-tools";
import { gql } from "apollo-server";
import * as toil from "./toil";

const baseQuerySchema = gql`
    type Query {
        _empty: String
    }
`;

const baseMutationSchema = gql`
    type Mutation {
        _empty: String
    }
`;

export const schema = makeExecutableSchema({
    typeDefs: [baseQuerySchema, baseMutationSchema, toil.typeDef],
    resolvers: [toil.resolvers]
});
