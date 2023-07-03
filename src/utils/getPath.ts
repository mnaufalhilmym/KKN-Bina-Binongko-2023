import { PathE } from "../enum/path";

export default function getPath(pathname: string) {
  let path = pathname.split("#")[0].replace(import.meta.env.VITE_BASE_URL, "");

  switch (path) {
    case "":
    case "/":
      return PathE.beranda;
    case "#wisata":
    case "/wisata":
      return PathE.wisata;
    case "#budaya-tradisi":
    case "/budaya-tradisi":
      return PathE.budaya_tradisi;
    case "#industri-kerajinan":
    case "/industri-kerajinan":
      return PathE.industri_kerajinan;
    case "#galeri":
    case "/galeri":
      return PathE.galeri;
    case "#blog":
    case "/blog":
      return PathE.blog;
    case "#peta":
    case "/peta":
      return PathE.peta;
  }
}
