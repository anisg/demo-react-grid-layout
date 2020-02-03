import {graphql,ExtQuery,TodoItemStatus,todo,block} from '../util'
    /* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBlocks
// ====================================================

export interface getBlocks_blocks_todos {
  id: string;
  status: TodoItemStatus;
  content: string;
  isLoading: boolean;
}

export interface getBlocks_blocks {
  id: string;
  todos: getBlocks_blocks_todos[];
}

export interface getBlocks {
  blocks: getBlocks_blocks[];
}

export interface getBlocksVariables {};

export const getBlocks:ExtQuery<getBlocks,getBlocksVariables> = graphql`
    query getBlocks {
  blocks @client {
    id
    todos {
      id
      status
      content
      isLoading
    }
  }
}
    ${todo}
${block}
`