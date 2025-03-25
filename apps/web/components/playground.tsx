"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import Player from "@components/player";
import SourceInput from "@components/source-input";
import { useSourceState } from "@hooks/use-source-state";

function Playground() {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [{ source, error, touched }, dispatch] = useSourceState();

  return (
    <>
      <SourceInput
        error={error}
        source={source}
        touched={touched}
        dispatch={dispatch}
        onPlayVideo={() => setIsPlayerOpen(true)}
      />
      {isPlayerOpen &&
        createPortal(
          <Player
            src={`/video/play?source=${source}`}
            onClosePlayer={() => setIsPlayerOpen(false)}
            onLoad={({ currentTarget }) => currentTarget.play()}
          />,
          document.body,
        )}
    </>
  );
}

export default Playground;
