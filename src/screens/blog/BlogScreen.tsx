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
import { GqlClient } from "../../api/gqlClient";
import { gql } from "@apollo/client/core";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import { marked } from "marked";
import styles from "../../styles/blog.module.css";
import manipulatePostContent from "../../utils/manipulatePostContent";
import ViewMore from "../../components/homeContent/ViewMore";
import SitePath from "../../data/sitePath";
import formatDateTime from "../../utils/formatDateTime";
import { A, useSearchParams } from "@solidjs/router";
import SearchBar from "../../components/search/SearchBar";
import { calculateEl } from "../../utils/calculateElement";

async function fetchBlog({
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
      blogs: { meta: { pagination: PaginationI }; data: BlogI[] };
    }>({
      query: gql`
        query Blog($search: String, $page: Int, $pageSize: Int) {
          blogs(
            filters: {
              or: [
                { judul: { containsi: $search } }
                { konten: { containsi: $search } }
              ]
            }
            sort: "publishedAt:desc"
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
              id
              attributes {
                judul
                konten
                createdAt
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
      pagination: res.data.blogs.meta.pagination,
      data: res.data.blogs.data,
    };
  } catch (e) {
    console.error("Error when fetching blog data");
    console.error(e);
  }
}

export default function BlogScreen() {
  let bottomItemElRef: HTMLDivElement | undefined;

  const containerElAmount = createMemo(() =>
    calculateEl({
      size: window.innerHeight + 100 ?? 0,
      cardSize: 310,
      cardGap: 64,
    })
  );

  const [searchParams, setSearchParams] = useSearchParams<{
    search?: string;
  }>();

  const [isLoading, setIsLoading] = createSignal(false);
  const [isError, setIsError] = createSignal(false);

  const [blog, setBlog] = createSignal<{
    pagination: PaginationI;
    data: BlogI[];
  }>({ pagination: defaultPagination, data: [] });

  const [page, setPage] = createSignal(1);
  const isAllFetched = createMemo(() => {
    const pagination = blog().pagination;
    if (!isLoading() && pagination.page >= pagination.pageCount) {
      return true;
    }
    return false;
  });

  createRenderEffect(() => {
    SiteHead.title = "Blog";
  });

  createRenderEffect(() => {
    const _search = searchParams.search;
    const _page = page();
    const _pageSize = containerElAmount();

    (async () => {
      setIsLoading(true);

      const data = await fetchBlog({
        search: _search,
        page: _page,
        pageSize: _pageSize,
      });

      if (!data) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      if (data.pagination.pageSize !== blog().pagination.pageSize) {
        if (data.pagination.page === 1) {
          setBlog(data);
        }
      } else if (data.pagination.page > blog().pagination.page) {
        setBlog((prev) => ({
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
    setBlog({
      pagination: defaultPagination,
      data: [],
    });
    setSearchParams({ search });
    setPage(1);
  }

  return (
    <div class="px-8 sm:px-16 md:px-24 lg:px-32">
      <div>
        <h1 class="font-poppins font-bold text-4xl text-center">Blog</h1>
      </div>
      <div class="mt-6">
        <SearchBar
          value={searchParams.search}
          placeholder="Cari blog"
          executeSearch={setSearchValue}
        />
      </div>
      <div class="mt-16 space-y-16">
        <For
          each={blog().data}
          fallback={
            <Show when={!isLoading() && !isError()}>
              <span class="block text-center">
                Tidak ada blog yang ditemukan.
              </span>
            </Show>
          }
        >
          {(g) => (
            <BlogPost
              id={g.id}
              title={g.attributes.judul}
              content={g.attributes.konten}
              createdAt={g.attributes.createdAt}
            />
          )}
        </For>
        <Show when={isLoading() || isError()}>
          <For
            each={
              blog().data.length ? [0] : [...Array(containerElAmount()).keys()]
            }
          >
            {() => (
              <LoadingSkeleton class="w-full max-w-screen-xl h-[400px] mx-auto rounded-xl" />
            )}
          </For>
        </Show>
      </div>
      <div ref={bottomItemElRef} />
    </div>
  );
}

interface BlogPostProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

function BlogPost(props: BlogPostProps) {
  return (
    <div class="max-w-screen-xl mx-auto pt-2 px-2 border rounded-xl">
      <A
        href={SitePath.blog + "/" + props.id}
        class="block relative max-h-[400px] overflow-hidden"
      >
        <div>
          <div>
            <h2 class="font-bold font-poppins text-center text-xl">
              <A href={SitePath.blog + "/" + props.id}>{props.title}</A>
            </h2>
          </div>
          <div>
            <span class="block font-futura_pt text-center">
              {formatDateTime(props.createdAt)}
            </span>
          </div>
          <p
            innerHTML={marked.parse(manipulatePostContent(props.content))}
            class={`mt-4 font-futura_pt text-justify break-words ${styles.content}`}
          />
        </div>
        <ViewMore href={SitePath.blog + "/" + props.id} />
      </A>
    </div>
  );
}
