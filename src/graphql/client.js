import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://normal-tiger-70.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": process.env.REACT_APP_API_KEY,
  },
  typeDefs: gql`
    type Song {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      url: String!
      duration: Float!
    }

    input SongInput {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      url: String!
      duration: Float!
    }

    type Query {
      queue: [Song]!
    }

    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `,
});

export default client;