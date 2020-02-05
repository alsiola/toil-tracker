import React from "react";
import { AuthContext } from "../auth";

export const Login: React.FC = () => (
    <AuthContext.Consumer>
        {({ auth }) =>
            auth.isAuthenticated() ? (
                <>Welcome {auth.user()!.name}</>
            ) : (
                <button onClick={auth.login}>Login</button>
            )
        }
    </AuthContext.Consumer>
);
