
// ~ auto generated
import { DocumentNode } from "graphql";

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum TodoItemStatus {
  active = "active",
  completed = "completed",
}

//==============================================================
// END Enums and Input Objects
//==============================================================


export const todo = `fragment todo on TodoItem {
  id
  content
  status
  isLoading
}`


export const block = `fragment block on Block {
  id
  todos {
    id
    content
    status
    isLoading
  }
}`


export {gql as graphql} from '@apollo/client'


export interface ExtQuery<T,T2> extends DocumentNode {
}

export interface ExtSubscription<T,T2> extends DocumentNode {
}

export interface ExtMutation<T,T2> extends DocumentNode {
  
}

