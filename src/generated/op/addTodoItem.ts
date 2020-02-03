import {graphql,ExtMutation,block} from '../util'
    /* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addTodoItem
// ====================================================

export interface addTodoItem_addTodoItem {
  id: string;
}

export interface addTodoItem {
  addTodoItem: addTodoItem_addTodoItem;
}

export interface addTodoItemVariables {
  blockId: string;
  content: string;
}

export const addTodoItem:ExtMutation<addTodoItem,addTodoItemVariables> = graphql`
    mutation addTodoItem($blockId: ID!, $content: String!) {
  addTodoItem(blockId: $blockId, content: $content) @client {
    id
  }
}
    ${block}
`