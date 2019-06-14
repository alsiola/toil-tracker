import React, { useRef } from "react";
import { Auth, AuthContext } from "./auth";
import { Router } from "@reach/router";
import { Route } from "./routing/Route";
import { Callback } from "./auth/Callback";
import { Login } from "./components/Login";
import { createClient } from "./gql/client";
import { ApolloProvider } from "react-apollo";

export const App: React.FC = () => {
    const { current: auth } = useRef(new Auth());
    const { current: client } = useRef(createClient(auth));

    return (
        <AuthContext.Provider value={{ auth }}>
            <ApolloProvider client={client}>
                <Router>
                    <Route path="/" Component={Login} />
                    <Route path="/callback" Component={Callback} auth={auth} />
                </Router>
            </ApolloProvider>
        </AuthContext.Provider>
    );
};
