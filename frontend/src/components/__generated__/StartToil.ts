/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StartToil
// ====================================================

export interface StartToil_startToil {
  __typename: "ToilEvent";
  id: number;
  user_sub: string;
  start: string;
  end: string | null;
}

export interface StartToil {
  startToil: StartToil_startToil;
}

export interface StartToilVariables {
  user_sub: string;
}
