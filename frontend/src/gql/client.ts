import ApolloClient from "apollo-boost";
import { Auth } from "../auth";

export const createClient = (auth: Auth) => {
    return new ApolloClient({
        uri: process.env.API_URL,
        request: operation => {
            operation.setContext({
                headers: {
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                    Identity: auth.getIdToken()
                }
            });
        }
    });
};
