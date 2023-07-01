import { Show } from "solid-js";
import IconLocation from "../icons/Location";
import IconArrowForwardCircle from "../icons/ArrowForwardCircle";

interface Props {
  name: string;
  location?: string;
  imageUrls: string[];
  description: string;
  onClick: (content: ModalHomeContentProps) => void;
}

export default function HomeContentCard(props: Props) {
  function onClick() {
    props.onClick({
      title: props.name,
      subtitle: props.location,
      imgUrls: props.imageUrls,
      description: props.description,
    });
  }

  return (
    <div
      class="w-60 h-96 group relative rounded-2xl overflow-hidden"
      role="button"
      onclick={onClick}
    >
      <Show when={props.location}>
        <div class="absolute z-10 top-2 right-2 flex items-center gap-x-1 px-2 py-1 rounded-full bg-sea_serpent text-white">
          <IconLocation class="w-6 h-6" />
          <span class="font-futura_pt font-medium text-sm">
            {props.location}
          </span>
        </div>
      </Show>
      <img
        src={
          import.meta.env.VITE_BACKEND_ENDPOINT +
          props.imageUrls[Math.floor(Math.random() * props.imageUrls.length)]
        }
        alt={props.name}
        class="w-full h-full object-cover group-hover:scale-125 transition-transform duration-300"
      />
      <div class="absolute bottom-0 z-10 w-full flex items-center justify-between gap-x-2 p-4 h-[88px]">
        <span class="font-futura_pt text-xl text-white">{props.name}</span>
        <span>
          <IconArrowForwardCircle type="outline" class="w-8 h-8 text-white" />
        </span>
      </div>
      <div class="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-sea_serpent to-80%" />
    </div>
  );
}
