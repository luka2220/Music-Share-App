import { ApolloClient } from "@apollo/client";
import cache from "./cache";

const client = new ApolloClient({
  uri: "https://normal-tiger-70.hasura.app/v1/graphql",
  cache: cache,
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": process.env.REACT_APP_API_KEY,
  },
});

export default client;
