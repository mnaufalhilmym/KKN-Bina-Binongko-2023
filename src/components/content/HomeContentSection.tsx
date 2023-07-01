import { For, Show } from "solid-js";
import Card from "../card/HomeContentCard";
import LoadingSkeleton from "../loading/LoadingSkeleton";

interface Props {
  title1: string;
  title2: string;
  contents: (WisataI | BudayaI | IndustriI)[];
  isLoading: boolean;
  onClickContent: (content: ModalHomeContentProps) => void;
}

export default function HomeContentSection(props: Props) {
  return (
    <>
      <div>
        <div class="w-fit mx-auto">
          <span class="font-tahu text-2xl text-sea_serpent">
            {props.title1}
          </span>
        </div>
        <div class="w-fit mx-auto">
          <span class="font-poppins font-bold text-3xl">{props.title2}</span>
        </div>
      </div>
      <div class="mt-6 flex justify-center flex-wrap gap-8">
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
    </>
  );
}
