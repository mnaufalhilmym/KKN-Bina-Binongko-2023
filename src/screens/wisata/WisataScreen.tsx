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
import { useSearchParams } from "@solidjs/router";
import SearchBar from "../../components/search/SearchBar";
import { createElementSize } from "@solid-primitives/resize-observer";
import { calculateEl } from "../../utils/calculateElement";

async function fetchWisata({
  search,
  page,
  pageSize,
}: {
  search?: string;
  page: number;
  pageSize: number;
}) {
  const client = GqlClient.client;

  try {
    const res = await client.query<{
      wisatas: { meta: { pagination: PaginationI }; data: WisataI[] };
    }>({
      query: gql`
        query Wisata($search: String, $page: Int, $pageSize: Int) {
          wisatas(
            filters: {
              or: [
                { nama: { containsi: $search } }
                { deskripsi: { containsi: $search } }
              ]
            }
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
        search,
        page,
        pageSize,
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

  const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
  const contailerElSize = createElementSize(containerRef);
  const containerElAmount = createMemo(() => ({
    col: calculateEl({
      size: contailerElSize.width ?? 0,
      cardSize: 240,
      cardGap: 32,
    }),
    row: calculateEl({
      size: window.innerHeight + 100 ?? 0,
      cardSize: 384,
      cardGap: 32,
    }),
  }));

  const [searchParams, setSearchParams] = useSearchParams<{
    search?: string;
  }>();

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
    const _pageSize = containerElAmount().col * containerElAmount().row;
    if (!_pageSize) return;

    const _search = searchParams.search;
    const _page = page();

    (async () => {
      setIsLoading(true);

      const data = await fetchWisata({
        search: _search,
        page: _page,
        pageSize: _pageSize,
      });

      if (!data) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      if (data.pagination.pageSize !== wisata().pagination.pageSize) {
        if (data.pagination.page === 1) {
          setWisata(data);
        }
      } else if (data.pagination.page > wisata().pagination.page) {
        setWisata((prev) => ({
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

  function setSearchValue(search?: string) {
    setWisata({
      pagination: defaultPagination,
      data: [],
    });
    setSearchParams({ search });
    setPage(1);
  }

  function showModal(content: ModalContentProps) {
    ModalWrapper.content = { element: ModalContent, props: [content] };
    ModalWrapper.isShow = true;
  }

  return (
    <>
      <div class="px-32">
        <div>
          <h1 class="font-poppins font-bold text-4xl text-center">
            Tempat Wisata
          </h1>
        </div>
        <div class="mt-6">
          <SearchBar
            value={searchParams.search}
            placeholder="Cari tempat wisata"
            executeSearch={setSearchValue}
          />
        </div>
        <div
          ref={setContainerRef}
          class="mt-16 flex justify-center flex-wrap gap-8"
        >
          <For
            each={wisata().data}
            fallback={
              <Show when={!isLoading() && !isError()}>
                <span class="block text-center">
                  Tidak ada tempat wisata yang ditemukan.
                </span>
              </Show>
            }
          >
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
            <For
              each={
                wisata().data.length
                  ? [...Array(containerElAmount().col).keys()]
                  : [
                      ...Array(
                        containerElAmount().col * containerElAmount().row
                      ).keys(),
                    ]
              }
            >
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
