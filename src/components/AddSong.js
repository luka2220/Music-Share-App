import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AddBoxOutlined, Link } from "@mui/icons-material";
import ReactPlayer from "react-player";
import SoundCloudPlayer from "react-player/soundcloud";
import YouTubePlayer from "react-player/youtube";
import { ADD_SONG } from "../graphql/mutations";
import { GET_SONGS } from "../graphql/queries";
import { useMutation } from "@apollo/client";

const DEFAULT_SONG = {
  duration: 0,
  title: "",
  artist: "",
  thumbnail: "",
};

export default function AddSong() {
  // State
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [playable, setPlayable] = useState(false);
  const [song, setSong] = useState(DEFAULT_SONG);
  //GraphQL Mutation
  const [addSong, { error }] = useMutation(ADD_SONG);

  // Check if URL can be played
  useEffect(() => {
    setPlayable(SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url));
  }, [url]);

  function handleCloseDialog() {
    setDialog(false);
  }

  async function handleAddSong() {
    try {
      const { artist, title, duration, thumbnail } = song;
      await addSong({
        variables: {
          artist: artist.length > 0 ? artist : null,
          title: title.length > 0 ? title : null,
          duration: duration.length > 0 ? duration : 0,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          url: url.length > 0 ? url : null,
        },
        // Executes the GET_SONGS query right after a new song is added
        refetchQueries: [{ query: GET_SONGS }],
      });

      // close dialog card & reset state values
      handleCloseDialog();
      setSong(DEFAULT_SONG);
      setUrl("");
    } catch (error) {
      console.error("Error adding song", error);
    }
  }

  function handleChangeSong(event) {
    const { name, value } = event.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value, // updating the name property in the song object
    }));
  }

  function handleInputError(textField) {
    return error?.graphQLErrors[0]?.extensions?.path.includes(textField);
  }

  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songData;

    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (player.getCurrentSound) {
      songData = await getSoundcloudInfo(nestedPlayer);
    }

    setSong({ ...songData, url });
  }

  function getYoutubeInfo(player) {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `https://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  }

  function getSoundcloudInfo(player) {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("-large", "-t500x500"),
          });
        }
      });
    });
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Dialog open={dialog} sx={{ textAlign: "center" }}>
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src={song.thumbnail}
            alt="Song thumbnail"
            styles={{ width: "90%" }}
          />
          <TextField
            margin="dense"
            name="title"
            label="Title"
            value={song.title}
            onChange={handleChangeSong}
            fullWidth
            error={handleInputError("title")}
            helperText={handleInputError("title") && "Fill out field"}
          />
          <TextField
            margin="dense"
            name="artist"
            label="Artist"
            value={song.artist}
            onChange={handleChangeSong}
            fullWidth
            error={handleInputError("artist")}
            helperText={handleInputError("artist") && "Fill out field"}
          />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            value={song.thumbnail}
            onChange={handleChangeSong}
            fullWidth
            error={handleInputError("thumbnail")}
            helperText={handleInputError("thumbnail") && "Fill out field"}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{ backgroundColor: "#CD1818" }}
          >
            Cancel
          </Button>
        </DialogActions>
        <DialogActions>
          <Button
            onClick={handleAddSong}
            variant="outlined"
            sx={{ backgroundColor: "#0C134F" }}
          >
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        sx={{ margin: "10px" }}
        placeholder="Add Youtube or Soundcloud url"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={!playable}
        onClick={() => setDialog(true)}
        variant="contained"
        sx={{ backgroundColor: "#00897b", margin: "10px" }}
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
}
