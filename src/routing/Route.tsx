import React from "react";
import { RouteComponentProps } from "@reach/router";

export const Route = <P extends RouteComponentProps>({
    Component,
    ...props
}: P &
    RouteComponentProps & {
        Component: React.ComponentClass<P> | React.FC<P>;
    }) => <Component {...props as any} />;
