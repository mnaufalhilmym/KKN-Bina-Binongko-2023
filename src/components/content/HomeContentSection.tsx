import { For, Show, createMemo, createSignal } from "solid-js";
import Card from "../card/HomeContentCard";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import HomeSection from "./HomeSection";
import ViewMore from "./ViewMore";
import { createElementSize } from "@solid-primitives/resize-observer";

interface Props {
  title1: string;
  title2: string;
  contents: {
    pagination: PaginationI;
    data: (WisataI | BudayaI | IndustriI)[];
  };
  readMoreHref: string;
  isLoading: boolean;
  onClickContent: (content: ModalHomeContentProps) => void;
}

export default function HomeContentSection(props: Props) {
  const [ref, setRef] = createSignal<HTMLDivElement>();
  const size = createElementSize(ref);
  const isShowViewMore = createMemo(() =>
    size.height ? size.height > window.innerHeight * 0.7 : false
  );

  return (
    <HomeSection title1={props.title1} title2={props.title2}>
      <div
        ref={setRef}
        class="relative max-h-[70vh] flex justify-center flex-wrap gap-8 overflow-hidden"
      >
        <Show
          when={!props.isLoading}
          fallback={
            <For each={[0, 1, 2]}>
              {(i) => <LoadingSkeleton class="w-60 h-96 rounded-2xl" />}
            </For>
          }
        >
          <For each={props.contents.data}>
            {(dest) => (
              <Card
                name={dest.attributes.nama}
                location={
                  "lokasi" in dest.attributes
                    ? dest.attributes.lokasi
                    : undefined
                }
                imageUrls={dest.attributes.foto.data.map(
                  (d) => d.attributes.url
                )}
                description={dest.attributes.deskripsi}
                onClick={props.onClickContent}
              />
            )}
          </For>
          <Show
            when={
              isShowViewMore() ||
              props.contents.pagination.total >
                props.contents.pagination.pageSize
            }
          >
            <ViewMore href={props.readMoreHref} />
          </Show>
        </Show>
      </div>
    </HomeSection>
  );
}
