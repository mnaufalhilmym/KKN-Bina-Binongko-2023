import { For, Show } from "solid-js";
import HomeSection from "./HomeSection";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import Card from "../card/HomeBlogCard";
import ViewMore from "./ViewMore";
import SitePath from "../../data/sitePath";

interface Props {
  title1: string;
  title2: string;
  blog: BlogI[];
  isLoading: boolean;
}

export default function HomeBlogSection(props: Props) {
  return (
    <HomeSection title1={props.title1} title2={props.title2}>
      <div class="relative max-h-[70vh] flex flex-wrap overflow-hidden">
        <Show
          when={!props.isLoading}
          fallback={
            <For each={[0, 1, 2]}>
              {(i) => (
                <div class="w-1/3 h-96 p-4">
                  <LoadingSkeleton class="w-full h-full rounded-xl" />
                </div>
              )}
            </For>
          }
        >
          <For each={props.blog}>
            {(b) => (
              <div class="w-1/3 p-4">
                <Card
                  title={b.attributes.judul}
                  content={b.attributes.konten}
                />
              </div>
            )}
          </For>
          <ViewMore href={SitePath.blog} />
        </Show>
      </div>
    </HomeSection>
  );
}
