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

async function fetchGallery({ page }: { page: number }) {
  const client = GqlClient.client;

  try {
    const res = await client.query<{
      galeris: { meta: { pagination: PaginationI }; data: GaleriI[] };
    }>({
      query: gql`
        query Gallery($page: Int) {
          galeris(
            sort: "publishedAt:asc"
            pagination: { page: $page, pageSize: 12 }
          ) {
            meta {
              pagination {
                page
                pageCount
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
  const [isLoading, setIsLoading] = createSignal(true);
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
    const _page = page();

    (async () => {
      setIsLoading(true);

      const data = await fetchGallery({ page: _page });

      if (!data) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      setGaleri((prev) => ({
        pagination: data.pagination,
        data: [...prev.data, ...data.data],
      }));

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
          <span class="font-poppins font-bold text-3xl">Galeri</span>
        </div>
      </div>
      <div class="mt-8 px-32 flex justify-center flex-wrap gap-4">
        <For each={galeri().data}>
          {(g) => (
            <img
              src={
                import.meta.env.VITE_BACKEND_ENDPOINT +
                g.attributes.foto.data.attributes.url
              }
              loading="lazy"
              class="h-72 w-72 object-cover rounded-xl shadow-md"
            />
          )}
        </For>
        <Show when={isLoading()}>
          <For each={[0, 1, 2, 3]}>
            {(i) => <LoadingSkeleton class="h-72 w-72 rounded-xl" />}
          </For>
        </Show>
      </div>
      <div ref={bottomItemElRef} />
    </>
  );
}
