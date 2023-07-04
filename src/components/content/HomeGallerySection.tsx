import { For, Show, createMemo, createSignal } from "solid-js";
import HomeSection from "./HomeSection";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import Card from "../card/GalleryCard";
import ViewMore from "./ViewMore";
import { createElementSize } from "@solid-primitives/resize-observer";
import SitePath from "../../data/sitePath";

interface Props {
  title1: string;
  title2: string;
  galeri: { pagination: PaginationI; data: GaleriI[] };
  isLoading: boolean;
}

export default function HomeGallerySection(props: Props) {
  const [ref, setRef] = createSignal<HTMLDivElement>();
  const size = createElementSize(ref);
  const isShowViewMore = createMemo(() =>
    size.height ? size.height > window.innerHeight * 0.7 : false
  );

  return (
    <HomeSection title1={props.title1} title2={props.title2}>
      <div
        ref={setRef}
        class="relative max-h-[70vh] flex justify-center flex-wrap gap-4 overflow-hidden"
      >
        <Show
          when={!props.isLoading}
          fallback={
            <For each={[0, 1, 2, 3]}>
              {() => <LoadingSkeleton class="h-72 w-72 rounded-xl" />}
            </For>
          }
        >
          <For each={props.galeri.data}>
            {(g) => <Card imgUrl={g.attributes.foto.data.attributes.url} />}
          </For>
          <Show
            when={
              isShowViewMore() ||
              props.galeri.pagination.total > props.galeri.pagination.pageSize
            }
          >
            <ViewMore href={SitePath.galeri} />
          </Show>
        </Show>
      </div>
    </HomeSection>
  );
}
