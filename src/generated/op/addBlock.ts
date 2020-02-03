import {graphql,ExtMutation,} from '../util'
    /* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addBlock
// ====================================================

export interface addBlock_addBlock {
  id: string;
}

export interface addBlock {
  addBlock: addBlock_addBlock | null;
}

export interface addBlockVariables {
  id: string;
}

export const addBlock:ExtMutation<addBlock,addBlockVariables> = graphql`
    mutation addBlock($id: ID!) {
  addBlock(id: $id) @client {
    id
  }
}
    
`