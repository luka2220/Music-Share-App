import React, { useContext, useState, useRef, useEffect } from "react";
import QueuedSongList from "./QueuedSongList";
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
import ReactPlayer from "react-player";
import { GET_QUEUED_SONGS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export default function SongPlayer() {
  // Context
  const { state, dispatch } = useContext(SongContext);
  // State
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [seeking, setSeeking] = useState(false); // State that tracker when user is seeking through the song, changing the position of the song
  const [positionInQueue, setPositionInQueue] = useState(0); // Tracks the current song position in queue
  // Refs
  const reactPlayerRef = useRef();
  // Client-side GraphQL query
  const { data } = useQuery(GET_QUEUED_SONGS);

  // Keeping track of the current song position in queue
  useEffect(() => {
    const songIndex = data.queuedSongItems.findIndex(
      (song) => song.id === state.song.id
    );
    setPositionInQueue(songIndex);
  }, [data.queuedSongItems, state.song.id]);

  useEffect(() => {
    const nextSong = data.queuedSongItems[positionInQueue + 1];
    if (played >= 0.99 && nextSong) {
      setPlayed(0);
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  }, [data.queuedSongItems, played, positionInQueue, dispatch]);

  function handlePlayPrevSong() {
    const prevSong = data.queuedSongItems[positionInQueue - 1];
    if (prevSong) {
      dispatch({ type: "SET_SONG", payload: { song: prevSong } });
    }
  }

  function handlePlayNextSong() {
    const nextSong = data.queuedSongItems[positionInQueue + 1];
    if (nextSong) {
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  }

  function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  function handleSliderChange(event, newValue) {
    setPlayed(newValue);
  }

  function handleSeekMouseDown() {
    setSeeking(true);
  }

  function handleSeekMouseUp() {
    setSeeking(false);
    reactPlayerRef.current.seekTo(played);
  }

  function formatDuration(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
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
            <IconButton onClick={handlePlayPrevSong}>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {!state.isPlaying ? (
                <PlayArrow sx={{ height: 38, width: 38 }} />
              ) : (
                <Pause sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <IconButton onClick={handlePlayNextSong}>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {formatDuration(playedSeconds)}
            </Typography>
          </div>
          <Slider
            sx={{ color: "#00897b" }}
            type="range"
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onChange={handleSliderChange}
            value={played}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ReactPlayer
          ref={reactPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
            }
          }}
          hidden
          url={state.song.url}
          playing={state.isPlaying}
        />
        <CardMedia sx={{ width: 175 }} image={state.song.thumbnail} />
      </Card>
      <QueuedSongList />
    </>
  );
}
