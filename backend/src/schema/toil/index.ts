import { gql } from "apollo-server";
import { Resolver } from "../resolver";

const toilEvents: Resolver<{}, { user_sub: string }> = async (
    _,
    { user_sub },
    { toilService }
) => {
    return toilService.getUserToils({ user_sub });
};

const currentToil: Resolver<{}, { user_sub: string }> = async (
    _,
    { user_sub },
    { toilService }
) => {
    return toilService.getCurrentUserToil({ user_sub });
};

const startToil: Resolver<{}, { user_sub: string }> = async (
    _,
    { user_sub },
    { toilService }
) => {
    return toilService.startToil({ user_sub });
};

const endToil: Resolver<{}, { id: number }> = async (
    _,
    { id },
    { toilService }
) => {
    return toilService.endToil({ id });
};

export const typeDef = gql`
    type ToilEvent {
        id: Int!
        user_sub: String!
        start: String!
        end: String
    }

    extend type Query {
        toilEvents(user_sub: String!): [ToilEvent!]!
        currentToil(user_sub: String!): ToilEvent
    }

    extend type Mutation {
        startToil(user_sub: String!): ToilEvent!
        endToil(id: Int!): ToilEvent!
    }
`;

export const resolvers = {
    Query: { toilEvents, currentToil },
    Mutation: { startToil, endToil }
};
