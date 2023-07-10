import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Making our custom mui theme available to all our components
root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>
);
