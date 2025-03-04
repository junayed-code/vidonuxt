"use client";

import { ChangeEvent } from "react";
import { useSourceState } from "@hooks/use-source-state";
import { useVideoPlayer } from "@components/video-player-provider";

function validation(value: string) {
  if (!value) return true;
  // Check if it's a valid url or not
  const regex = /^https?:\/\/(?:.*)\.\w{2,5}(?:\/.*\/?)*$/;
  return regex.test(value);
}

function SourceInput() {
  const [{ source, error, touched }, dispatch] = useSourceState();
  const { playerRef } = useVideoPlayer();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    const action = !validation(value)
      ? ({
          type: "update/source/with-error",
          payload: { value, error: `This is an invalid url` },
        } as const)
      : ({ type: "update/source/without-error", payload: value } as const);

    dispatch(action);
  };

  const handleBlur = () => {
    if (touched) return;
    dispatch({ type: "update/touched/true" });
  };

  const handlePlayVideo = () => {
    const player = playerRef.current;
    if (!player || !source || error) return;
    player.src = `/video/play?source=${source}`;
  };

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <input
          type="url"
          value={source}
          className="border-primary placeholder:text-secondary/60 flex h-9 w-full rounded-md border px-3 py-1 outline-none"
          placeholder="Enter the video source url that you want to play right now."
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {touched && error && (
          <p className="p-0.5 text-sm text-rose-600">{error}</p>
        )}
      </div>
      <button
        onClick={handlePlayVideo}
        className="bg-primary inline-flex h-9 cursor-pointer items-center justify-center self-start rounded-sm px-4 py-1 text-sm font-semibold uppercase tracking-wider text-gray-100 duration-100 active:scale-95"
      >
        Play
      </button>
    </div>
  );
}

export default SourceInput;
