import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Guide from "@/route";
import UniversalContext, {
  UniversalContextDefaultValue,
} from "@/context/UniversalContext";

ReactDOM.render(
  <React.StrictMode>
    <UniversalContext.Provider value={UniversalContextDefaultValue}>
      <Guide />
    </UniversalContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to index results (for example: reportWebVitals(console.index))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
