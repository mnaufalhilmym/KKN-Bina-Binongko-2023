export default function manipulatePostContent(content: string) {
  return content.replaceAll(
    "/uploads/",
    `${import.meta.env.VITE_BACKEND_ENDPOINT}/uploads/`
  );
}
