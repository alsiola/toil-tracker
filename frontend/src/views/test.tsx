import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const Test: React.FC = () => {
    return (
        <Query<{}, {}>
            query={gql`
                query test {
                    _empty
                }
            `}
        >
            {props => {
                console.log(props);
                return "Loading";
            }}
        </Query>
    );
};
