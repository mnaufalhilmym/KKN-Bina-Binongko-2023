import { Show, createSignal } from "solid-js";
import IconPlayCircle from "../icons/PlayCircle";
import IconPauseCircle from "../icons/PauseCircle";
import siteImages from "../../contents/images";
import Scan from "../icons/Scan";

interface Props {
  src: string;
  type?: string;
}

export default function Video(props: Props) {
  let ref: HTMLVideoElement | undefined;

  const [isPlaying, setIsPlaying] = createSignal(false);

  function play(e: MouseEvent) {
    e.stopPropagation();
    ref!.play();
  }

  function pause(e: MouseEvent) {
    e.stopPropagation();
    ref!.pause();
  }

  function fullscreen(e: MouseEvent) {
    e.stopPropagation();
    ref?.requestFullscreen();
  }

  return (
    <div
      role="button"
      onclick={(e) => (isPlaying() ? pause(e) : play(e))}
      class="group relative flex items-center justify-center"
    >
      <div
        class="absolute"
        classList={{
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300":
            isPlaying(),
        }}
      >
        <Show
          when={isPlaying()}
          fallback={<IconPlayCircle class="w-16 h-16 text-white" />}
        >
          <IconPauseCircle class="w-16 h-16 text-white" />
        </Show>
      </div>
      <Show when={isPlaying()}>
        <button
          onClick={fullscreen}
          class="absolute z-10 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Scan class="w-6 h-6 text-white" />
        </button>
      </Show>
      <video
        ref={ref}
        autoplay={false}
        preload="none"
        muted={false}
        loop={false}
        poster={siteImages.papan_nama_togo_binongko.url}
        onplay={() => setIsPlaying(true)}
        onpause={() => setIsPlaying(false)}
        onended={() => setIsPlaying(false)}
      >
        <source
          src={import.meta.env.VITE_BASE_URL + props.src}
          type={props.type}
        />
      </video>
    </div>
  );
}
