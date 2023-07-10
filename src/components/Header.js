import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { HeadsetTwoTone } from "@mui/icons-material";

export default function Header() {
  return (
    <AppBar sx={{ backgroundColor: "#00897b" }} position="fixed">
      <Toolbar>
        <HeadsetTwoTone />
        <Typography sx={{ marginLeft: "10px" }} variant="h6" component="h1">
          Apollo Music Player
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
