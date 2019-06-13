import React, { useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { Auth } from ".";

const handleAuthentication = ({
    location,
    auth
}: RouteComponentProps & { auth: Auth }) => {
    if (/access_token|id_token|error/.test(location!.hash)) {
        auth.handleAuthentication();
    }
};

export const Callback: React.FC<
    RouteComponentProps & { auth: Auth }
> = props => {
    useEffect(() => handleAuthentication(props));
    return <div>Authenticating</div>;
};
