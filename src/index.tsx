import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./index.css"
import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css"
// - Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { resolvers } from "./resolvers"
// - Pages
import RootPage from "./pages/Root"

const cache = new InMemoryCache()

cache.writeData({
  data: {
    blocks: [],
  },
})

const client = new ApolloClient({
  cache: cache,
  resolvers,
})

const App = () => <RootPage />

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
