import ApolloClient from "apollo-boost";
import { Auth } from "../auth";

export const createClient = (auth: Auth) => {
    return new ApolloClient({
        uri: "http://localhost:4001",
        request: operation => {
            if (auth.isAuthenticated()) {
                operation.setContext({
                    headers: {
                        Authorization: `Bearer ${auth.getAccessToken()}`,
                        Identity: auth.getIdToken()
                    }
                });
            }
        }
    });
};
