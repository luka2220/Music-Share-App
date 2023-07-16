import { makeVar, InMemoryCache } from "@apollo/client";

const songItems = [];
const queuedSongItems = makeVar(songItems);

export function addSongToQueue(song) {
  queuedSongItems([song, ...queuedSongItems()])
}

// Defining how the cache will handle client side data (queuedSongItems)
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        queuedSongItems: {
          read() {
            return queuedSongItems();
          },
        },
      },
    },
  },
});

export default cache;
