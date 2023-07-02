import { marked } from "marked";
import styles from "./HomeBlogCard.module.css";

interface Props {
  title: string;
  content: string;
}

export default function HomeBlogCard(props: Props) {
  return (
    <div class="max-h-[35rem] overflow-hidden">
      <div>
        <span class="block font-bold font-poppins text-center">
          {props.title}
        </span>
      </div>
      <p
        innerHTML={marked.parse(manipulatePostContent(props.content))}
        class={`mt-2 font-futura_pt text-justify break-words ${styles.content}`}
      />
    </div>
  );
}

function manipulatePostContent(content: string) {
  return content.replaceAll(
    "/uploads/",
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/uploads/`
  );
}
