import { For, Setter, Show, createMemo } from "solid-js";
import Card from "../card/ContentCard";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import HomeSection from "./HomeSection";
import ViewMore from "./ViewMore";

interface Props {
  title1: string;
  title2: string;
  contents: {
    pagination: PaginationI;
    data: (WisataI | BudayaI | IndustriI)[];
  };
  readMoreHref: string;
  isLoading: boolean;
  col: number;
  height: number;
  setRef: Setter<HTMLDivElement | undefined>;
  onClickContent: (content: ModalContentProps) => void;
}

export default function HomeContentSection(props: Props) {
  const isShowViewMore = createMemo(
    () => Math.floor(props.height) >= Math.floor(window.innerHeight * 0.7)
  );

  return (
    <HomeSection title1={props.title1} title2={props.title2}>
      <div
        ref={props.setRef}
        class="relative max-h-[70vh] flex justify-center flex-wrap gap-8 overflow-hidden"
      >
        <Show
          when={!props.isLoading}
          fallback={
            <For each={[...Array(props.col).keys()]}>
              {() => <LoadingSkeleton class="w-60 h-96 rounded-2xl" />}
            </For>
          }
        >
          <For each={props.contents.data}>
            {(data) => (
              <Card
                name={data.attributes.nama}
                location={
                  "lokasi" in data.attributes
                    ? data.attributes.lokasi
                    : undefined
                }
                contact={
                  "kontak" in data.attributes
                    ? data.attributes.kontak
                    : undefined
                }
                contactName={
                  "nama_kontak" in data.attributes
                    ? data.attributes.nama_kontak
                    : undefined
                }
                imageUrls={data.attributes.foto.data.map(
                  (d) => d.attributes.url
                )}
                description={data.attributes.deskripsi}
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
