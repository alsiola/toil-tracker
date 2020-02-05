import React, { useRef } from "react";
import { Auth, AuthContext } from "./auth";
import { createClient } from "./gql/client";
import { ApolloProvider } from "react-apollo";
import { Routing } from "./Routing";

export const App: React.FC = () => {
    const { current: auth } = useRef(new Auth());
    const { current: client } = useRef(createClient(auth));

    return (
        <AuthContext.Provider value={{ auth }}>
            <ApolloProvider client={client}>
                <Routing />
            </ApolloProvider>
        </AuthContext.Provider>
    );
};
