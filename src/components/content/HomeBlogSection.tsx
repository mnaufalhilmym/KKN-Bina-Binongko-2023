import { For, Show } from "solid-js";
import HomeSection from "./HomeSection";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import Card from "../card/HomeBlogCard";
import { A } from "@solidjs/router";

interface Props {
  title1: string;
  title2: string;
  blog: BlogI[];
  isLoading: boolean;
}

export default function HomeBlogSection(props: Props) {
  return (
    <HomeSection title1={props.title1} title2={props.title2}>
      <div class="relative flex flex-wrap">
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
          <div class="absolute bottom-10 w-full h-2/5 bg-gradient-to-b from-transparent to-white">
            <div class="absolute bottom-0 w-full">
              <A
                href="/blog"
                class="block w-fit mx-auto font-bold font-futura_pt"
              >
                Lihat selengkapnya
              </A>
            </div>
          </div>
          <div class="absolute bottom-0 w-full h-10 bg-white" />
        </Show>
      </div>
    </HomeSection>
  );
}
