"use client";

import { createContext, useContext, useRef } from "react";

type VideoPlayerContextValue = {
  playerRef: React.RefObject<HTMLVideoElement | null>;
};

const VideoPlayerContext = createContext({} as VideoPlayerContextValue);
export const useVideoPlayer = () => useContext(VideoPlayerContext);

type VideoPlayerProviderProps = { children: React.ReactNode };

function VideoPlayerProvider({ children }: VideoPlayerProviderProps) {
  const playerRef = useRef<HTMLVideoElement>(null);

  return (
    <VideoPlayerContext value={{ playerRef }}>{children}</VideoPlayerContext>
  );
}

export default VideoPlayerProvider;
