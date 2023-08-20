import { gql } from "@apollo/client/core";
import { GqlClient } from "../../api/gqlClient";
import { useParams } from "@solidjs/router";
import { Show, createRenderEffect, createSignal } from "solid-js";
import SiteHead from "../../state/siteHead";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import { marked } from "marked";
import manipulatePostContent from "../../utils/manipulatePostContent";
import styles from "../../styles/blog.module.css";
import { formatDatetime } from "../../utils/formatDatetime";

async function fetchBlogDetail({ id }: { id: string }) {
  const client = GqlClient.client;

  try {
    const res = await client.query<{ blog: { data: BlogI } }>({
      query: gql`
        query BlogDetail($id: ID) {
          blog(id: $id) {
            data {
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
        id,
      },
    });

    return res.data.blog.data;
  } catch (e) {
    console.error("Error when fetching blog detail data");
    console.error(e);
  }
}

export default function BlogDetailScreen() {
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = createSignal(false);
  const [isError, setIsError] = createSignal(false);
  const [blog, setBlog] = createSignal<BlogI>();

  createRenderEffect(() => {
    const title = blog()?.attributes.judul;
    if (title) {
      SiteHead.title = title;
    }
  });

  createRenderEffect(async () => {
    setIsLoading(true);

    const data = await fetchBlogDetail({ id: params.id });

    if (!data) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    setBlog(data);

    setIsLoading(false);
  });

  return (
    <div class="max-w-screen-xl mx-auto px-8 sm:px-16 md:px-24 lg:px-32">
      <Show
        when={blog() && !isLoading() && !isError()}
        fallback={
          <>
            <div>
              <LoadingSkeleton class="w-full lg:w-[38rem] h-10 mx-auto rounded-xl" />
            </div>
            <div class="mt-2">
              <LoadingSkeleton class="w-[20rem] h-8 mx-auto rounded-xl" />
            </div>
            <div class="mt-12">
              <LoadingSkeleton class="w-full h-96 mx-auto rounded-xl" />
            </div>
          </>
        }
      >
        <>
          <div>
            <h1 class="font-bold font-poppins text-4xl text-center">
              {blog()!.attributes.judul}
            </h1>
          </div>
          <div class="mt-2">
            <span class="block font-futura_pt text-center">
              {formatDatetime(blog()!.attributes.createdAt)}
            </span>
          </div>
          <div class="mt-8">
            <p
              innerHTML={marked.parse(
                manipulatePostContent(blog()!.attributes.konten)
              )}
              class={`font-futura_pt text-justify break-words ${styles.content}`}
            />
          </div>
        </>
      </Show>
    </div>
  );
}
