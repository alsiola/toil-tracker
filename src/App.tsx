import React, { useRef } from "react";
import { Auth, AuthContext } from "./auth";
import { Router } from "@reach/router";
import { Route } from "./routing/Route";
import { Callback } from "./auth/Callback";
import { Hello } from "./components/Login";

export const App: React.FC = () => {
    const { current: auth } = useRef(new Auth());

    return (
        <AuthContext.Provider value={{ auth }}>
            <Router>
                <Route path="/" Component={Hello} />
                <Route path="/callback" Component={Callback} auth={auth} />
            </Router>
        </AuthContext.Provider>
    );
};
