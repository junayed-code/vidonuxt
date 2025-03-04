"use client";

import { useEffect, type VideoHTMLAttributes } from "react";
import { useVideoPlayer } from "@components/video-player-provider";

type PlayerProps = VideoHTMLAttributes<HTMLVideoElement>;

function Player({ ...props }: PlayerProps) {
  const { playerRef } = useVideoPlayer();

  useEffect(() => {
    const video = playerRef.current;
    if (!video) return;
    video.volume = 0;
  }, [playerRef]);

  return (
    <div>
      <video
        {...props}
        controls
        autoPlay
        className="aspect-video w-full"
        ref={playerRef}
      ></video>
    </div>
  );
}

export default Player;
