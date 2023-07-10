import { gql } from "@apollo/client";

// Returs all songs from DB
export const GET_SONGS = gql`
  query getSongs {
    songs(order_by: { created_at: desc }) {
      artist
      duration
      id
      thumbnail
      title
      url
    }
  }
`;

// Retrievies all the queued songs
// Only runs on the client
export const GET_QUEUED_SONGS = gql`
  query getQueuedSongs {
    queue @client {
      id
      duration
      atrist
      thumbnail
      title
      url
    }
  }
`;
