import { GET_SONGS } from "../graphql/queries";
import { SongContext } from "../App";
import { useQuery } from "@apollo/client";
import { Pause, PlayArrow, Save } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { addSongToQueue } from "../graphql/cache";

export default function SongList() {
  const { loading, error, data } = useQuery(GET_SONGS);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress sx={{ color: "#00897b" }} />
      </div>
    );
  }

  if (error) return <div>Error fetching songs{console.log(error.message)}</div>;

  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}

function Song({ song }) {
  const { title, artist, thumbnail, id } = song;
  const { state, dispatch } = useContext(SongContext);
  const [currentSongPlaying, setCurrentSongPlaying] = useState(false);

  useEffect(() => {
    const isSongPlaying = state.isPlaying && id === state.song.id;
    setCurrentSongPlaying(isSongPlaying);
  }, [id, state.song.id, state.isPlaying]);

  function handleTogglePlay() {
    dispatch({ type: "SET_SONG", payload: { song } });
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  function handleAddSongToQueue() {
    addSongToQueue(song);
  }

  return (
    <Card sx={{ margin: "12px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          image={thumbnail}
          sx={{ objectFit: "cover", width: 140, height: 140 }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="b1" component="p" sx={{ color: "#9e9e9e" }}>
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              onClick={handleTogglePlay}
              size="small"
              sx={{ color: "#00897b" }}
            >
              {currentSongPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              onClick={handleAddSongToQueue}
              size="small"
              sx={{ color: "#6200ea" }}
            >
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}
