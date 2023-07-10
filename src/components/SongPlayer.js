import React, { useContext } from "react";
import QueuedSongList from "./QueuedSongList";
import { GET_QUEUED_SONGS } from "../graphql/queries";
import { SongContext } from "../App";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { useQuery } from "@apollo/client";

export default function SongPlayer() {
  const { state, dispatch } = useContext(SongContext);
  const { loading, error, data } = useQuery(GET_QUEUED_SONGS);

  function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  return (
    <>
      <Card
        sx={{ display: "flex", justifyContent: "space-between" }}
        variant="outlined"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0px 15px",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h5" component="h3">
              {state.song.title}
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {state.song.artist}
            </Typography>
          </CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {!state.isPlaying ? (
                <PlayArrow sx={{ height: 38, width: 38 }} />
              ) : (
                <Pause sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              00:01:30
            </Typography>
          </div>
          <Slider
            sx={{ color: "#00897b" }}
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <CardMedia sx={{ width: 175 }} image={state.song.thumbnail} />
      </Card>
      <QueuedSongList queue={data.queue} />
    </>
  );
}
