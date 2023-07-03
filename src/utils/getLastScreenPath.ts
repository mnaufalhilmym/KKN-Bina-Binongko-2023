export default function getLastScreenPath(path: string) {
  return "/" + path.split("/").at(-1);
}
