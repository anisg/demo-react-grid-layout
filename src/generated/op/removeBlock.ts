import {graphql,ExtMutation,} from '../util'
    /* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeBlock
// ====================================================

export interface removeBlock_removeBlock {
  id: string;
}

export interface removeBlock {
  removeBlock: removeBlock_removeBlock | null;
}

export interface removeBlockVariables {
  id: string;
}

export const removeBlock:ExtMutation<removeBlock,removeBlockVariables> = graphql`
    mutation removeBlock($id: ID!) {
  removeBlock(id: $id) @client {
    id
  }
}
    
`