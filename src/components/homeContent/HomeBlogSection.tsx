import { For, Setter, Show } from "solid-js";
import HomeSection from "./HomeSection";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import Card from "../card/HomeBlogCard";
import ViewMore from "./ViewMore";
import SitePath from "../../data/sitePath";
import { homeConfig } from "../../contants/homeConfig";

interface Props {
  title1: string;
  title2: string;
  blog: BlogI[];
  isLoading: boolean;
  col: number;
  height: number;
  setRef: Setter<HTMLDivElement | undefined>;
}

export default function HomeBlogSection(props: Props) {
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
        <div ref={props.setRef} class="flex justify-center">
          <Show
            when={!props.isLoading}
            fallback={
              <For each={[...Array(props.col).keys()]}>
                {() => (
                  <div
                    class="flex-1 p-4"
                    style={{
                      height:
                        props.height < homeConfig.sectionMaxHeight
                          ? "70vh"
                          : `${homeConfig.sectionMaxHeight}px`,
                    }}
                  >
                    <LoadingSkeleton class="w-full h-full rounded-xl" />
                  </div>
                )}
              </For>
            }
          >
            <For each={props.blog}>
              {(b) => (
                <div class="flex-1 p-4">
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
      </div>
    </HomeSection>
  );
}
