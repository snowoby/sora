import { UniversalContextProps } from "@/types";
import React from "react";

export const UniversalContextDefaultValue = {
  siteName: "owo.st",
  storage: undefined,
};
const UniversalContext = React.createContext<UniversalContextProps>(
  UniversalContextDefaultValue
);

export default UniversalContext;
