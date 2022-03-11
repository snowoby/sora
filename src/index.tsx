import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import log from "./log";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
log.log("asdasd")

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
