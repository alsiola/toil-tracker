import React from "react";
import { AuthContext } from "../../auth";

export const Hello: React.FC = () => (
    <AuthContext.Consumer>
        {({ auth }) =>
            auth.isAuthenticated() ? (
                <>
                    <div>Hello</div>
                    <button onClick={auth.logout}>Logout</button>
                </>
            ) : (
                <button onClick={auth.login}>Login</button>
            )
        }
    </AuthContext.Consumer>
);
