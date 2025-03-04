import Player from "@components/player";
import SourceInput from "@components/source-input";
import VideoPlayerProvider from "@components/video-player-provider";

export default async function Home() {
  return (
    <main className="px-4 pb-20 pt-8">
      <div className="bg-tertiary mx-auto max-w-5xl space-y-4 rounded-md px-5 py-6">
        <VideoPlayerProvider>
          <SourceInput />
          <Player />
        </VideoPlayerProvider>
      </div>
    </main>
  );
}
