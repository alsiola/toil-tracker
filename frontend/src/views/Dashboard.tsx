import React from "react";
import { Auth0UserProfile } from "auth0-js";
import gql from "graphql-tag";
import { StartToil } from "../components/StartToil";
import { Query } from "react-apollo";
import { CurrentToil, CurrentToilVariables } from "./__generated__/CurrentToil";
import { ViewToil } from "../components/ViewToil";

export const CURRENT_TOIL = gql`
    query CurrentToil($user_sub: String!) {
        currentToil(user_sub: $user_sub) {
            id
            user_sub
            start
            end
        }
    }
`;

export const Dashboard: React.FC<{ user: Auth0UserProfile }> = ({ user }) => {
    return (
        <Query<CurrentToil, CurrentToilVariables>
            query={CURRENT_TOIL}
            variables={{ user_sub: user.sub }}
        >
            {({ data, error, loading }) => (
                <div>
                    {error && <div>Check your connection</div>}

                    {loading && <div>Loading</div>}

                    {!error && !!data && !data.currentToil && (
                        <StartToil user={user} />
                    )}

                    {!error && !!data && !!data.currentToil && (
                        <ViewToil toil={data.currentToil} />
                    )}
                </div>
            )}
        </Query>
    );
};
