import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
  
import App from "./App";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import dotenv from "dotenv";

dotenv.config();
let mode: PaletteMode = "light";
if (process.env.NODE_ENV === "production") {
  mode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const darkTheme = createTheme({
  palette: {
    mode: mode,
  },
});

ReactDOM.render(
  <React.StrictMode>
    {/*<ThemeProvider theme={darkTheme}>*/}
    <CssBaseline />
    <App />
    {/*</ThemeProvider>*/}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to index results (for example: reportWebVitals(console.index))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
