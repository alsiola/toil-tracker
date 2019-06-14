import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth";
import { Auth0UserProfile } from "auth0-js";

const Welcome: React.FC = () => {
    const [user, setUser] = useState<Auth0UserProfile>();
    const [error, setError] = useState<string>();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        setError(undefined);
        setUser(undefined);
        auth.getUser()
            .then(setUser)
            .catch(setError);
    }, [auth, setUser, setError]);

    if (error) {
        return <>Could not fetch user: {error}</>;
    }

    if (!user) {
        return <>Loading</>;
    }

    return <div>Welcome {user.given_name}</div>;
};

export const Login: React.FC = () => (
    <AuthContext.Consumer>
        {({ auth }) =>
            auth.isAuthenticated() ? (
                <>
                    <Welcome />
                    <button onClick={auth.logout}>Logout</button>
                </>
            ) : (
                <button onClick={auth.login}>Login</button>
            )
        }
    </AuthContext.Consumer>
);
