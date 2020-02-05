/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentToil
// ====================================================

export interface CurrentToil_currentToil {
  __typename: "ToilEvent";
  id: number;
  user_sub: string;
  start: string;
  end: string | null;
}

export interface CurrentToil {
  currentToil: CurrentToil_currentToil | null;
}

export interface CurrentToilVariables {
  user_sub: string;
}
