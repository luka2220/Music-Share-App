import { makeVar, InMemoryCache } from "@apollo/client";

const clientHasQueue = Boolean(localStorage.getItem("queue"));
const queuedSongItems = clientHasQueue
  ? makeVar(JSON.parse(localStorage.getItem("queue")))
  : makeVar([]);

// Adds/Removes song in the queue, based on if it is currently in the queue
export function addOrRemoveFromQueue(song) {
  const isInQueue = queuedSongItems().some((qSong) => qSong.id === song.id);

  // Deletes queued song if it exists otherwise adds song to queue
  const newQueue = isInQueue
    ? queuedSongItems().filter((qSong) => qSong.id !== song.id)
    : [...queuedSongItems(), song];


  queuedSongItems(newQueue);
  localStorage.setItem("queue", JSON.stringify(queuedSongItems()));
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
