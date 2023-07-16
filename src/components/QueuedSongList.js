import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { GET_QUEUED_SONGS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export default function QueuedSongList() {
  const { data } = useQuery(GET_QUEUED_SONGS);
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    greaterThanMd && (
      <div style={{ margin: "10px 0" }}>
        <Typography variant="button" color="textSecondary">
          QUEUE ({data.queuedSongItems.length})
        </Typography>
        {data.queuedSongItems.map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
}

function QueuedSong({ song, test }) {
  const { thumbnail, artist, title } = song;

  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "50px auto 50px",
        gridGap: 12,
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Avatar
        sx={{ width: 44, height: 44 }}
        src={thumbnail}
        alt="Song thumbnail"
      />
      <div style={{ overfloe: "hidden", whiteSpace: "nowrap" }}>
        <Typography
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
          variant="subtitle2"
        >
          {title}
        </Typography>
        <Typography
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
          color="textSecondary"
          variant="body2"
        >
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}
