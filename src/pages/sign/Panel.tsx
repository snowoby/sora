import React, { useContext } from "react";
import UniversalContext from "@/context/UniversalContext";

const Panel = ({ children }: { children?: React.ReactNode }) => {
  const universalConfig = useContext(UniversalContext);

  return (
    <>
      <div className="m-0 max-w-md w-screen max-h-96 h-screen bg-red-50 rounded-lg p-2">
        <h1 className="text-center text-4xl">{universalConfig.siteName}</h1>
        <div className="mt-2">{children}</div>
      </div>
    </>
  );
};

export default Panel;
