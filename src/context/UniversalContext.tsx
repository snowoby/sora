import React from "react";

export const UniversalContextDefaultValue = {
  siteName: "owo.st",
};
const UniversalContext = React.createContext(UniversalContextDefaultValue);

export default UniversalContext;
