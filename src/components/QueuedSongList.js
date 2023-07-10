import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography, useMediaQuery } from "@mui/material";
import React from "react";

export default function QueuedSongList({ queue }) {
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const song = {
    title: "sun",
    artist: "憂鬱",
    thumbnail: "https://img.youtube.com/vi/oxoqm05c7yA/0.jpg",
  };

  return (
    greaterThanMd && (
      <div style={{ margin: "10px 0" }}>
        <Typography variant="button" color="textSecondary">
          QUEUE (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
}

function QueuedSong({ song }) {
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
