import { gql } from "@apollo/client";

// Returns all songs from DB
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

// Returns the queuedSongList from client side state
export const GET_QUEUED_SONGS = gql`
  query getQueuedSongs {
    queuedSongItems @client
  }
`;
