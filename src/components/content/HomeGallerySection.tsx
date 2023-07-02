import { For, Show } from "solid-js";
import HomeSection from "./HomeSection";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import Card from "../card/HomeGalleryCard";

interface Props {
  title1: string;
  title2: string;
  galeri: GaleriI[];
  isLoading: boolean;
}

export default function HomeGallerySection(props: Props) {
  return (
    <HomeSection title1={props.title1} title2={props.title2}>
      <div class="flex justify-center flex-wrap gap-4">
        <Show
          when={!props.isLoading}
          fallback={
            <For each={[0, 1, 2, 3]}>
              {(i) => <LoadingSkeleton class="w-40 h-40 rounded-xl" />}
            </For>
          }
        >
          <For each={props.galeri}>
            {(g) => <Card imgUrl={g.attributes.foto.data.attributes.url} />}
          </For>
        </Show>
      </div>
    </HomeSection>
  );
}
