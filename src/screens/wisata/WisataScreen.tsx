import { gql } from "@apollo/client/core";
import { GqlClient } from "../../api/gqlClient";
import {
  For,
  Show,
  createMemo,
  createRenderEffect,
  createSignal,
  getOwner,
  onCleanup,
  onMount,
} from "solid-js";
import { defaultPagination } from "../../types/defaultValue/pagination";
import SiteHead from "../../state/siteHead";
import Card from "../../components/card/ContentCard";
import CenterModal from "../../components/modal/CenterModalWrapper";
import ModalContent from "../../components/modal/ContentModal";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";

async function fetchWisata({ page }: { page: number }) {
  const client = GqlClient.client;

  try {
    const res = await client.query<{
      wisatas: { meta: { pagination: PaginationI }; data: WisataI[] };
    }>({
      query: gql`
        query Wisata($page: Int) {
          wisatas(
            sort: "publishedAt:asc"
            pagination: { page: $page, pageSize: 16 }
          ) {
            meta {
              pagination {
                page
                pageCount
              }
            }
            data {
              attributes {
                nama
                lokasi
                foto {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                deskripsi
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
      pagination: res.data.wisatas.meta.pagination,
      data: res.data.wisatas.data,
    };
  } catch (e) {
    console.error("Error when fetching wisata data");
    console.error(e);
  }
}

export default function WisataScreen() {
  let bottomItemElRef: HTMLDivElement | undefined;
  const [isLoading, setIsLoading] = createSignal(false);
  const [isError, setIsError] = createSignal(false);
  const [wisata, setWisata] = createSignal<{
    pagination: PaginationI;
    data: WisataI[];
  }>({ pagination: defaultPagination, data: [] });
  const [page, setPage] = createSignal(1);
  const isAllFetched = createMemo(() => {
    const pagination = wisata().pagination;
    if (!isLoading() && pagination.page >= pagination.pageCount) {
      return true;
    }
    return false;
  });
  const ModalWrapper = new CenterModal({
    owner: getOwner(),
    cardClass: "w-2/3",
  });

  createRenderEffect(() => {
    SiteHead.title = "Tempat Wisata";
  });

  createRenderEffect(() => {
    const _page = page();

    (async () => {
      setIsLoading(true);

      const data = await fetchWisata({ page: _page });

      if (!data) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      setWisata((prev) => ({
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

  function showModal(content: ModalContentProps) {
    ModalWrapper.content = { element: ModalContent, props: [content] };
    ModalWrapper.isShow = true;
  }

  return (
    <>
      <div class="px-32">
        <div>
          <h1 class="font-poppins font-bold text-3xl text-center">
            Tempat Wisata
          </h1>
        </div>
        <div class="mt-8 flex justify-center flex-wrap gap-8">
          <For each={wisata().data}>
            {(b) => (
              <Card
                name={b.attributes.nama}
                location={b.attributes.lokasi}
                imageUrls={b.attributes.foto.data.map((f) => f.attributes.url)}
                description={b.attributes.deskripsi}
                onClick={showModal}
              />
            )}
          </For>
          <Show when={isLoading() || isError()}>
            <For each={[0, 1, 2, 4]}>
              {() => <LoadingSkeleton class="w-60 h-96 rounded-2xl" />}
            </For>
          </Show>
          <div
            ref={bottomItemElRef}
            class="absolute -z-10 bottom-0 w-60 h-96"
          />
        </div>
      </div>

      {/* Modal */}
      {ModalWrapper.render()}
    </>
  );
}
