import { For, JSXElement, Show, createSignal } from "solid-js";
import IconArrowCircle from "../icons/ArrowForwardCircle";

interface Props {
  imgUrls: string[];
  class?: string;
}

export default function PhotoSlider(props: Props) {
  const [position, setPosition] = createSignal(-100);
  const [isTransitioning, setIsTransitioning] = createSignal(false);

  function nextPosition() {
    if (isTransitioning()) return;
    setIsTransitioning(true);
    setPosition(position() - 100);
  }

  function prevPosition() {
    if (isTransitioning()) return;
    setIsTransitioning(true);
    setPosition(position() + 100);
  }

  function onTransitionEnd() {
    setIsTransitioning(false);
    if (position() === 0) {
      setPosition(props.imgUrls.length * -100);
    } else if (position() === (props.imgUrls.length + 1) * -100) {
      setPosition(-100);
    }
  }

  return (
    <div class="relative group">
      <div class="rounded-3xl shadow-md overflow-hidden">
        <div
          class="flex"
          classList={{
            "transition-transform duration-500": isTransitioning(),
          }}
          style={
            props.imgUrls.length > 1
              ? { transform: `translateX(${position()}%)` }
              : undefined
          }
          ontransitionend={onTransitionEnd}
        >
          <Show when={props.imgUrls.length > 1}>
            <div class="w-full h-full flex-none">
              <img
                src={
                  import.meta.env.VITE_BACKEND_ENDPOINT + props.imgUrls.at(-1)
                }
                alt="Hope for the future"
                class="w-full h-full object-cover"
              />
            </div>
          </Show>
          <For each={props.imgUrls}>
            {(imgSrc) => (
              <div class="w-full h-full flex-none">
                <img
                  src={import.meta.env.VITE_BACKEND_ENDPOINT + imgSrc}
                  class="w-full h-full object-cover"
                />
              </div>
            )}
          </For>
          <Show when={props.imgUrls.length > 1}>
            <div class="w-full h-full flex-none">
              <img
                src={
                  import.meta.env.VITE_BACKEND_ENDPOINT + props.imgUrls.at(0)
                }
                class="w-full h-full object-cover"
              />
            </div>
          </Show>
        </div>
      </div>
      <div class="absolute top-1/2 -translate-y-1/2 w-full px-2 flex justify-between overflow-hidden">
        <Button onClick={prevPosition}>
          <IconArrowCircle
            type="filled"
            direction="back"
            class="w-8 h-8 text-white -translate-x-[120%] group-hover:translate-x-0 transition-transform"
          />
        </Button>
        <Button onClick={nextPosition}>
          <IconArrowCircle
            type="filled"
            direction="forward"
            class="w-8 h-8 text-white translate-x-[120%] group-hover:translate-x-0 transition-transform"
          />
        </Button>
      </div>
    </div>
  );
}

interface ButtonProps {
  children: JSXElement;
  class?: string;
  onClick: (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => void;
}

function Button(props: ButtonProps) {
  return (
    <button
      class={`flex${props.class ? ` ${props.class}` : ""}`}
      onclick={props.onClick}
    >
      {props.children}
    </button>
  );
}
