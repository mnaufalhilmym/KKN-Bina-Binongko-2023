import { gql } from "@apollo/client/core";
import { GqlClient } from "../../api/gqlClient";
import {
  For,
  Show,
  createMemo,
  createRenderEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { defaultPagination } from "../../types/defaultValue/pagination";
import SiteHead from "../../state/siteHead";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import Card from "../../components/card/GalleryCard";
import { createElementSize } from "@solid-primitives/resize-observer";
import { calculateEl } from "../../utils/calculateElement";

async function fetchGallery({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const client = GqlClient.client;

  try {
    const res = await client.query<{
      galeris: { meta: { pagination: PaginationI }; data: GaleriI[] };
    }>({
      query: gql`
        query Gallery($page: Int, $pageSize: Int) {
          galeris(
            sort: "publishedAt:asc"
            pagination: { page: $page, pageSize: $pageSize }
          ) {
            meta {
              pagination {
                page
                pageCount
                pageSize
              }
            }
            data {
              attributes {
                foto {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        page,
        pageSize,
      },
    });

    return {
      pagination: res.data.galeris.meta.pagination,
      data: res.data.galeris.data,
    };
  } catch (e) {
    console.error("Error when fetching gallery data");
    console.error(e);
  }
}

export default function GaleriScreen() {
  let bottomItemElRef: HTMLDivElement | undefined;

  const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
  const contailerElSize = createElementSize(containerRef);
  const containerElAmount = createMemo(() => ({
    col: calculateEl({
      size: contailerElSize.width ?? 0,
      cardSize: 288,
      cardGap: 16,
    }),
    row: calculateEl({
      size: window.innerHeight + 100 ?? 0,
      cardSize: 288,
      cardGap: 16,
    }),
  }));

  const [isLoading, setIsLoading] = createSignal(false);
  const [isError, setIsError] = createSignal(false);

  const [galeri, setGaleri] = createSignal<{
    pagination: PaginationI;
    data: GaleriI[];
  }>({ pagination: defaultPagination, data: [] });

  const [page, setPage] = createSignal(1);
  const isAllFetched = createMemo(() => {
    const pagination = galeri().pagination;
    if (!isLoading() && pagination.page >= pagination.pageCount) {
      return true;
    }
    return false;
  });

  createRenderEffect(() => {
    SiteHead.title = "Galeri";
  });

  createRenderEffect(() => {
    const _pageSize = containerElAmount().col * containerElAmount().row;
    if (!_pageSize) return;

    const _page = page();

    (async () => {
      setIsLoading(true);

      const data = await fetchGallery({ page: _page, pageSize: _pageSize });

      if (!data) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      if (data.pagination.pageSize !== galeri().pagination.pageSize) {
        if (data.pagination.page === 1) {
          setGaleri(data);
        }
      } else if (data.pagination.page > galeri().pagination.page) {
        setGaleri((prev) => ({
          pagination: data.pagination,
          data: [...prev.data, ...data.data],
        }));
      }

      setIsLoading(false);

      nextPageIfBottomItemElInViewport();
    })();
  });

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (isAllFetched()) {
          if (bottomItemElRef) observer.unobserve(bottomItemElRef);
          return;
        }
        nextPage();
      }
    });

    if (bottomItemElRef) observer.observe(bottomItemElRef);

    onCleanup(() => {
      if (bottomItemElRef) observer.unobserve(bottomItemElRef);
    });
  });

  function nextPage() {
    if (isLoading() || isAllFetched()) return;
    setPage((prev) => prev + 1);
  }

  function nextPageIfBottomItemElInViewport() {
    const rect = bottomItemElRef?.getBoundingClientRect();
    if (!rect) return;
    if (rect.top <= document.documentElement.clientHeight) {
      nextPage();
    }
  }

  return (
    <>
      <div class="px-32">
        <div class="w-fit mx-auto">
          <span class="font-poppins font-bold text-4xl">Galeri</span>
        </div>
      </div>
      <div
        ref={setContainerRef}
        class="relative mt-8 px-32 flex justify-center flex-wrap gap-4"
      >
        <For each={galeri().data}>
          {(g) => <Card imgUrl={g.attributes.foto.data.attributes.url} />}
        </For>
        <Show when={galeri().data.length === 0 || isLoading() || isError()}>
          <For
            each={
              galeri().data.length
                ? [...Array(containerElAmount().col).keys()]
                : [
                    ...Array(
                      containerElAmount().col * containerElAmount().row
                    ).keys(),
                  ]
            }
          >
            {() => <LoadingSkeleton class="h-72 w-72 rounded-xl" />}
          </For>
        </Show>
        <div ref={bottomItemElRef} class="absolute -z-10 bottom-0 w-60 h-96" />
      </div>
    </>
  );
}
