"use client";

import { forwardRef, type VideoHTMLAttributes } from "react";

type PlayerProps = VideoHTMLAttributes<HTMLVideoElement> & {
  onClosePlayer(): void;
};

export default forwardRef<HTMLVideoElement, PlayerProps>(function Player(
  { onClosePlayer, ...props },
  ref,
) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900 p-2.5">
      <button
        onClick={onClosePlayer}
        className="absolute right-8 top-6 cursor-pointer rounded-full bg-neutral-800 p-2 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <video
        {...props}
        controls
        autoPlay
        className="aspect-video w-full max-w-3xl"
        ref={ref}
      ></video>
    </div>
  );
});
