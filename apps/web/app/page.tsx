import Container from "@components/container";
import Playground from "@components/playground";

export default function Home() {
  return (
    <Container className="flex flex-col justify-center gap-12 md:gap-14 lg:gap-16">
      <div className="-mt-20 space-y-4 sm:-mt-10 md:space-y-6 lg:space-y-8">
        <h1 className="text-center text-4xl font-bold lg:text-[3.5rem]">
          <span className="text-primary text-2xl lg:text-3xl">
            Just Paste & Play
          </span>
          <br />
          Stop Downloading. Start Streaming.
        </h1>
        <p className="text-center md:text-lg">
          Supports various video formats. Watch anything directly in your
          browser. Experience instant streaming without limitations. Enjoy
          effortless playback of your favorite content.
        </p>
      </div>

      <Playground />
    </Container>
  );
}
