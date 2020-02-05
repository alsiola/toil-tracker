import auth0, { Auth0UserProfile } from "auth0-js";
import { navigate } from "@reach/router";
import { createContext } from "react";

export class Auth {
    private auth0 = new auth0.WebAuth({
        domain: "toiltracker.eu.auth0.com",
        clientID: "HghK4WksrBCqBf57d7FUbsU8mC0P9l5F",
        redirectUri: "http://localhost:4000/callback",
        responseType: "token id_token",
        scope: "openid profile email"
    });

    private accessToken?: string;
    private idToken?: string;
    private expiresAt?: number;
    private userInfo?: Auth0UserProfile;

    private getUser = (accessToken: string, cb: () => void) => {
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (err) {
                console.error(err);
            }
            this.userInfo = profile;
            cb();
        });
    };

    user = () => {
        return this.userInfo;
    };

    login = () => {
        this.auth0.authorize();
    };

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.getUser(authResult.accessToken, () =>
                    this.setSession(authResult)
                );
            } else if (err) {
                navigate("/");
                console.log(err);
                alert(
                    `Error: ${
                        err.error
                    }. Check the console for further details.`
                );
            }
        });
    };

    getAccessToken = () => {
        return this.accessToken;
    };

    getIdToken = () => {
        return this.idToken;
    };

    private setSession = (authResult: any) => {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem("isLoggedIn", "true");

        // Set the time that the Access Token will expire at
        let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;

        // navigate to the home route
        navigate("/app");
    };

    private renewSession = () => {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.logout();
                console.log(err);
                alert(
                    `Could not get a new token (${err.error}: ${
                        err.error_description
                    }).`
                );
            }
        });
    };

    logout = () => {
        // Remove tokens and expiry time
        this.accessToken = undefined;
        this.idToken = undefined;
        this.expiresAt = 0;

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem("isLoggedIn");

        this.auth0.logout({
            returnTo: window.location.origin
        });

        // navigate to the home route
        navigate("/");
    };

    isAuthenticated = () => {
        // Check whether the current time is past the
        // access token's expiry time
        if (!this.expiresAt) {
            return false;
        }
        return new Date().getTime() < this.expiresAt && !!this.userInfo;
    };
}

export const AuthContext = createContext({
    auth: new Auth()
});
