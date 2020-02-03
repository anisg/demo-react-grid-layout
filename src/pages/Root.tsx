import React, { useState, useEffect, useCallback, useMemo } from "react"
import styled from "@emotion/styled"
// - Components
import { FlexC, FlexR } from "../components/util"
import { TodoList, InputAddItem } from "../components"
import ql, { gql, useQuery, useMutation } from "../generated/ql"

import GridLayout from "react-grid-layout"
//import { Responsive as RespGridLayout } from 'react-grid-layout';

gql`
  # Block

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

  mutation addBlock($id: ID!) {
    addBlock(id: $id) @client {
      id
    }
  }

  mutation removeBlock($id: ID!) {
    removeBlock(id: $id) @client {
      id
    }
  }

  # Item

  mutation addTodoItem($blockId: ID!, $content: String!) {
    addTodoItem(blockId: $blockId, content: $content) @client {
      id
    }
  }

  mutation updateTodoItem($id: ID!, $content: String, $status: TodoItemStatus) {
    updateTodoItem(id: $id, content: $content, status: $status) @client
  }

  mutation removeTodoItem($blockId: ID!, $id: ID!) {
    removeTodoItem(blockId: $blockId, id: $id) @client {
      id
    }
  }
`

// -------------------------
// Styled Components
// -------------------------

const Wrap = styled(FlexC)`
  flex: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: grey;
  height: 100%;
`

const Header = styled(FlexC)`
  font-size: 30px;
  font-weight: bold;
`

const Card = styled(FlexC)`
  flex: 1;
  width: 100%;
`

const Cont = styled(FlexC)`
  width: 100%;
  border: 1px solid black;
  align-items: center;
  background-color: grey;
  color: white;
`

const Block = styled(FlexC)`
  border: 1px solid black;
  padding: 3px;
  background-color: white;
  opacity: 0.8;
`

// -------------------------
// Reduxed components
// -------------------------

const BlockContent = ({ e }) => {
  const [removeBlock] = useMutation(ql.removeBlock)

  const [addTodoItem] = useMutation(ql.addTodoItem)
  const [updateTodoItem] = useMutation(ql.updateTodoItem)
  const [removeTodoItem] = useMutation(ql.removeTodoItem)

  return (
    <>
      <div style={{ flex: 1 }}>
        <InputAddItem
          onSubmit={content =>
            addTodoItem({ variables: { blockId: e.id, content } })
          }
          placeholder={`block ${e.id}...`}
        />
        <TodoList
          todos={e.todos}
          isLoading={false}
          onChangeItemContent={(id, content) =>
            updateTodoItem({ variables: { id, content } })
          }
          onChangeItemStatus={(id, status) =>
            updateTodoItem({ variables: { id, status } })
          }
          onRemoveItem={id =>
            removeTodoItem({ variables: { blockId: e.id, id } })
          }
        />
      </div>
      <button onClick={() => removeBlock({ variables: { id: e.id } })}>
        remove block {e.id}
      </button>
    </>
  )
}

const WrapGridLayout = ({ blocks, onCreateBlock, layout, ...otherProps }) => {
  return (
    <>
      <FlexR>
        <Header>Grid Layout</Header>
        <button onClick={onCreateBlock}>Add block</button>
      </FlexR>
      <Cont>
        <Card>
          <GridLayout
            className="layout"
            style={{ minHeight: 170 }}
            isDroppable={true}
            width={1200}
            draggableCancel="input,textarea,button"
          >
            {blocks.map(e => (
              <Block key={e.id} data-grid={layout[e.id]}>
                <BlockContent e={e} />
              </Block>
            ))}
          </GridLayout>
        </Card>
      </Cont>
    </>
  )
}
// -------------------------
// Page
// -------------------------

let _id = 1
export default () => {
  const {
    data: { blocks },
  } = useQuery(ql.getBlocks)
  const [_addBlock] = useMutation(ql.addBlock)

  const [layout, setLayout] = useState({})

  const addBlock = useCallback(async () => {
    let id = `${_id++}`

    _addBlock({ variables: { id } })
    let l = { i: id, x: 0, y: 0, w: 3, h: 1, minW: 3, static: false }

    setLayout({ ...layout, [id]: l })
  }, [blocks, layout])

  return (
    <Wrap>
      <WrapGridLayout
        blocks={blocks}
        onCreateBlock={() => addBlock()}
        layout={layout}
      />
    </Wrap>
  )
}
