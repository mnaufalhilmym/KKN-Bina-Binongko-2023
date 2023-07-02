import { For, Show } from "solid-js";
import Card from "../card/HomeContentCard";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import HomeSection from "./HomeSection";

interface Props {
  title1: string;
  title2: string;
  contents: (WisataI | BudayaI | IndustriI)[];
  isLoading: boolean;
  onClickContent: (content: ModalHomeContentProps) => void;
}

export default function HomeContentSection(props: Props) {
  return (
    <HomeSection title1={props.title1} title2={props.title2}>
      <div class="flex justify-center flex-wrap gap-8">
        <Show
          when={!props.isLoading}
          fallback={
            <For each={[0, 1, 2]}>
              {(i) => <LoadingSkeleton class="w-60 h-96 rounded-2xl" />}
            </For>
          }
        >
          <For each={props.contents}>
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
        </Show>
      </div>
    </HomeSection>
  );
}
