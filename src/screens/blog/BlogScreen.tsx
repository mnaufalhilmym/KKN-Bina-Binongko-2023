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

async function fetchBlog({ page }: { page: number }) {
  const client = GqlClient.client;

  try {
    const res = await client.query<{
      blogs: { meta: { pagination: PaginationI }; data: BlogI[] };
    }>({
      query: gql`
        query Blog($page: Int) {
          blogs(
            sort: "publishedAt:asc"
            pagination: { page: $page, pageSize: 15 }
          ) {
            meta {
              pagination {
                page
                pageCount
              }
            }
            data {
              attributes {
                judul
                konten
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
  const [isLoading, setIsLoading] = createSignal(true);
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
    const _page = page();

    (async () => {
      setIsLoading(true);

      const data = await fetchBlog({ page: _page });

      if (!data) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      setBlog((prev) => ({
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
          <span class="font-poppins font-bold text-3xl">Blog</span>
        </div>
      </div>
      <div class="mt-8 px-32 space-y-4">
        <For each={blog().data}>
          {(g) => (
            <div class="max-h-[35rem] overflow-hidden">
              <div>
                <span class="block font-bold font-poppins text-center">
                  {g.attributes.judul}
                </span>
              </div>
              <p
                innerHTML={marked.parse(
                  manipulatePostContent(g.attributes.konten)
                )}
                class={`mt-2 font-futura_pt text-justify break-words ${styles.content}`}
              />
            </div>
          )}
        </For>
        <Show when={isLoading()}>
          <For each={[0, 1, 2, 3]}>
            {(i) => <LoadingSkeleton class="w-full h-72 rounded-xl" />}
          </For>
        </Show>
      </div>
      <div ref={bottomItemElRef} />
    </>
  );
}
