import React from "react";
import { Auth0UserProfile } from "auth0-js";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
    StartToil as StartToilResponse,
    StartToilVariables
} from "./__generated__/StartToil";

import { CURRENT_TOIL } from "../views/Dashboard";

const START_TOIL = gql`
    mutation StartToil($user_sub: String!) {
        startToil(user_sub: $user_sub) {
            id
            user_sub
            start
            end
        }
    }
`;

export const StartToil: React.FC<{
    user: Auth0UserProfile;
}> = ({ user }) => {
    return (
        <Mutation<StartToilResponse, StartToilVariables>
            mutation={START_TOIL}
            variables={{ user_sub: user.sub }}
            refetchQueries={[
                { query: CURRENT_TOIL, variables: { user_sub: user.sub } }
            ]}
        >
            {(mutate, result) => (
                <>
                    <button
                        onClick={() =>
                            mutate({ variables: { user_sub: user.sub } })
                        }
                    >
                        Start Toiling
                    </button>
                    {result && result.error && (
                        <div>Toiling went wrong: {result.error.message}</div>
                    )}
                    {result && !result.error && result.data && (
                        <div>Toiling away!</div>
                    )}
                </>
            )}
        </Mutation>
    );
};
