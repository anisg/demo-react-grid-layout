import {graphql,ExtMutation,block} from '../util'
    /* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeTodoItem
// ====================================================

export interface removeTodoItem_removeTodoItem {
  id: string;
}

export interface removeTodoItem {
  removeTodoItem: removeTodoItem_removeTodoItem | null;
}

export interface removeTodoItemVariables {
  blockId: string;
  id: string;
}

export const removeTodoItem:ExtMutation<removeTodoItem,removeTodoItemVariables> = graphql`
    mutation removeTodoItem($blockId: ID!, $id: ID!) {
  removeTodoItem(blockId: $blockId, id: $id) @client {
    id
  }
}
    ${block}
`