import React from "react";
import { AuthContext } from "./auth";
import { Router } from "@reach/router";
import { Route } from "./routing/Route";
import { Callback } from "./auth/Callback";
import { Login } from "./components/Login";
import { Dashboard } from "./views/Dashboard";

const Main: React.FC = () => (
    <AuthContext.Consumer>
        {({ auth }) =>
            auth.isAuthenticated() ? (
                <Dashboard user={auth.user()!} />
            ) : (
                <Login />
            )
        }
    </AuthContext.Consumer>
);

export const Routing: React.FC = () => {
    return (
        <AuthContext.Consumer>
            {({ auth }) => (
                <Router>
                    <Route path="/" Component={Login} />
                    <Route path="/app" Component={Main} />
                    <Route path="/callback" Component={Callback} auth={auth} />
                </Router>
            )}
        </AuthContext.Consumer>
    );
};
