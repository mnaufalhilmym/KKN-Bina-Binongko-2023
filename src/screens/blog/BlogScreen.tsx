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
import ViewMore from "../../components/content/ViewMore";
import SitePath from "../../data/sitePath";
import formatDateTime from "../../utils/formatDateTime";
import { A } from "@solidjs/router";

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
    const _page = page();

    (async () => {
      setIsLoading(true);

      const data = await fetchBlog({ page: _page });
      console.log(">>>DATA,", data);

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
    <div class="px-32">
      <div>
        <h1 class="font-poppins font-bold text-3xl text-center">Blog</h1>
      </div>
      <div class="mt-8 space-y-16">
        <For each={blog().data}>
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
          <For each={[0, 1, 2]}>
            {() => <LoadingSkeleton class="w-full h-[300px] rounded-xl" />}
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
    <div class="pt-2 px-2 border rounded-xl">
      <div class="relative max-h-[300px] overflow-hidden">
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
      </div>
    </div>
  );
}
