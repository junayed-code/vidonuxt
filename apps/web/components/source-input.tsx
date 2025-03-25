"use client";

import { ActionDispatch, ChangeEvent } from "react";
import { type Action } from "@hooks/use-source-state";

function validation(value: string) {
  if (!value) return true;
  // Check if it's a valid url or not
  const regex = /^https?:\/\/(?:.*)\.\w{2,5}(?:\/.*\/?)*$/;
  return regex.test(value);
}

type SourceInputProps = {
  source: string;
  error: string | null;
  touched: boolean;
  dispatch: ActionDispatch<[Action]>;
  onPlayVideo(): void;
};

function SourceInput({
  error,
  source,
  touched,
  dispatch,
  onPlayVideo,
}: SourceInputProps) {
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
    if (!source || error) return;
    onPlayVideo();
  };

  return (
    <div className="bg-secondary flex gap-3 rounded-3xl px-5 py-5">
      <div className="flex-1">
        <input
          type="url"
          tabIndex={1}
          value={source}
          className="border-primary placeholder:text-tertiary flex h-10 w-full rounded-md border px-3 py-1 text-white outline-none"
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
        className="bg-primary inline-flex h-10 cursor-pointer items-center justify-center gap-1 self-start rounded-sm px-4 py-1 text-sm font-semibold uppercase tracking-wider text-gray-100 duration-100 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
        Play
      </button>
    </div>
  );
}

export default SourceInput;
