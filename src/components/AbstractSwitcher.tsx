import React, { useEffect, useRef, useState } from "react";

const AbstractSwitcher = <T,>() => {
  const [open, setOpen] = useState<boolean>(false);
  const [menuWidth, setMenuWidth] = useState("auto");
  const anchor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMenuWidth(`300px`);
    if (anchor.current) setMenuWidth(`${anchor.current.clientWidth}px`);
  }, [anchor, window.innerWidth]);
  return (
    <>
      <div ref={anchor} />
    </>
  );
};

export default AbstractSwitcher;
