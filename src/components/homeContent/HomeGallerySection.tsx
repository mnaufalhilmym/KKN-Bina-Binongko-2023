import { For, Setter, Show, createMemo } from "solid-js";
import HomeSection from "./HomeSection";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import Card from "../card/GalleryCard";
import ViewMore from "./ViewMore";
import SitePath from "../../data/sitePath";
import { homeConfig } from "../../contants/homeConfig";

interface Props {
  title1: string;
  title2: string;
  galeri: { pagination: PaginationI; data: GaleriI[] };
  isLoading: boolean;
  col: number;
  height: number;
  setRef: Setter<HTMLDivElement | undefined>;
}

export default function HomeGallerySection(props: Props) {
  const isShowViewMore = createMemo(() => {
    const heightLimit = window.innerHeight * 0.7;
    return (
      props.height >=
      (heightLimit > homeConfig.sectionMaxHeight
        ? homeConfig.sectionMaxHeight
        : heightLimit)
    );
  });

  return (
    <HomeSection title1={props.title1} title2={props.title2}>
      <div
        class="relative overflow-hidden"
        style={{
          "max-height":
            props.height < homeConfig.sectionMaxHeight
              ? "70vh"
              : `${homeConfig.sectionMaxHeight}px`,
        }}
      >
        <div ref={props.setRef} class="flex justify-center flex-wrap gap-4">
          <Show
            when={!props.isLoading}
            fallback={
              <For each={[...Array(props.col).keys()]}>
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
      </div>
    </HomeSection>
  );
}
