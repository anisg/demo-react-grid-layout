import ql, { gql } from "./generated/ql"
import { TodoItemStatus } from "./generated/util"
import produce from "immer"

const todoFragment = gql`
  fragment todo on TodoItem {
    id
    content
    status
    isLoading
  }
`

const blockFragment = gql`
  fragment block on Block {
    id
    todos {
      id
      content
      status
      isLoading
    }
  }
`

let idx = 0
let idBlock = 0
export const resolvers = {
  Mutation: {
    addTodoItem: (_, { blockId, content }, { cache, getCacheKey }) => {
      const block = cache.readFragment({
        fragment: blockFragment,
        id: `Block:${blockId}`,
      })
      console.log("block", block)
      let item = {
        __typename: "TodoItem",
        id: idx++,
        content,
        status: TodoItemStatus.active,
        isLoading: false,
      }
      const nextBlock = produce(block, block => {
        block.todos = [item, ...block.todos]
      })
      cache.writeData({
        data: {
          block: nextBlock,
        },
      })
      return item
    },

    updateTodoItem: (_, { id, content = null, status = null }, { cache }) => {
      //get item
      const todo = cache.readFragment({
        fragment: todoFragment,
        id: `TodoItem:${id}`,
      })
      const nextTodo = produce(todo, x => {
        if (content) x.content = content
        if (status) x.status = status
      })
      cache.writeData({ data: nextTodo, id: `TodoItem:${id}` })
      return true
    },

    removeTodoItem: (_, { blockId, id }, { cache }) => {
      const block = cache.readFragment({
        fragment: blockFragment,
        id: `Block:${blockId}`,
      })
      let item = null
      let nextBlock = {
        ...block,
        todos: block.todos.filter(e => {
          if (e.id == id) {
            item = e
            return false
          } else return true
        }),
      }
      cache.writeData({
        data: {
          block: nextBlock,
        },
      })
      return item
    },

    removeBlock: (_, { id }, { cache }) => {
      const prev = cache.readQuery({ query: ql.getBlocks })
      let removedItem = null
      const data = {
        ...prev,
        blocks: prev.blocks.filter(e => {
          if (e.id == id) {
            removedItem = e
            return false
          }
          return true
        }),
      }
      cache.writeData({ data })
      return removedItem
    },

    addBlock: (_, { id }, { cache }) => {
      const prev = cache.readQuery({ query: ql.getBlocks })
      const newItem = { __typename: "Block", id, todos: [] }
      const data = {
        blocks: [newItem, ...prev.blocks],
      }
      cache.writeData({ data })
      return newItem
    },
  },

  TodoItem: {},
  Block: {},
}
