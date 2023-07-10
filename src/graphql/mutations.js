import { gql } from "@apollo/client";

// GraphQL mutation for adding a new song
export const ADD_SONG = gql`
  mutation addSong($artist: String!, $title: String!, $thumbnail: String!, $duration: Float!, $url: String!) {
    insert_songs(
      objects: {
        artist: $artist
        title: $title
        thumbnail: $thumbnail
        duration: $duration
        url: $url
      }
    ) {
      affected_rows
    }
  }
`;