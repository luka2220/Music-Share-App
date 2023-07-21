import React, { createContext, useContext, useReducer } from "react";
// custom components
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
// reducer
import songReducer from "./reducer";
// mui components
import { Grid, useMediaQuery, Hidden } from "@mui/material";

// Default song on App load
export const SongContext = createContext({
  song: {
    id: "af53e6b6-241f-453d-85b5-1d65e1f33f19",
    title: "HOME",
    artist: "Pyxis",
    thumbnail: "https://img.youtube.com/vi/3Ax6jTZlu_g/0.jpg",
    url: "https://www.youtube.com/watch?v=3Ax6jTZlu_g",
    duration: 218,
  },
  isPlaying: false,
});

export default function App() {
  const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  // App wide song state
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{ paddingTop: greaterThanSm ? 80 : 20 }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd
              ? { position: "fixed", width: "100%", right: 20, top: 70 }
              : {
                  position: "fixed",
                  width: "100%",
                  bottom: 0,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}
