import { A, useLocation } from "@solidjs/router";
import SitePath from "../../data/sitePath";
import SiteInfo from "../../data/siteInfo";
import { createMemo, createSignal, onCleanup, onMount } from "solid-js";
import getPath from "../../utils/getPath";
import { PathE } from "../../enum/path";

export default function Navbar() {
  const location = useLocation<string>();
  const path = createMemo(() => getPath(location.pathname));
  const isOnHome = createMemo(() => path() === PathE.beranda);
  const [isOnTop, setIsOnTop] = createSignal(checkIsOnTopOfHome());

  onMount(() => {
    const scrollListener = () => {
      setIsOnTop(checkIsOnTopOfHome());
    };

    document.addEventListener("scroll", scrollListener);
    onCleanup(() => {
      document.removeEventListener("scroll", scrollListener);
    });
  });

  function checkIsOnTopOfHome() {
    return isOnHome() && window.scrollY < 100;
  }

  return (
    <div class="fixed z-50 w-full px-8 py-4">
      <div
        class="h-20 px-8 flex items-center justify-between bg-white transition-color duration-300 rounded-full overflow-hidden"
        classList={{ "bg-white/60": isOnTop(), "drop-shadow-lg": !isOnTop() }}
      >
        <div class="h-full flex gap-x-4 items-center">
          <img
            src={
              import.meta.env.VITE_BASE_URL +
              "/src/assets/logo/bina-binongko.webp"
            }
            alt="Logo Bina Binongko"
            loading="lazy"
            class="w-16 h-16"
          />
          <span class="font-poppins font-bold text-gargoyle_gas">
            {SiteInfo.title}
          </span>
        </div>
        <nav class="flex items-center gap-x-1 font-poppins">
          <Link href={SitePath.beranda} isOnTop={isOnTop()}>
            Beranda
          </Link>
          <Link
            href={isOnHome() ? `${SitePath.beranda}#wisata` : SitePath.wisata}
            isOnTop={isOnTop()}
          >
            Tempat Wisata
          </Link>
          <Link
            href={
              isOnHome()
                ? `${SitePath.beranda}#budaya-tradisi`
                : SitePath.budaya_tradisi
            }
            isOnTop={isOnTop()}
          >
            Budaya & Tradisi
          </Link>
          <Link
            href={
              isOnHome()
                ? `${SitePath.beranda}#industri-kerajinan`
                : SitePath.industri_kerajinan
            }
            isOnTop={isOnTop()}
          >
            Industri & Kerajinan
          </Link>
          <Link
            href={isOnHome() ? `${SitePath.beranda}#galeri` : SitePath.galeri}
            isOnTop={isOnTop()}
          >
            Galeri
          </Link>
          <Link
            href={isOnHome() ? `${SitePath.beranda}#blog` : SitePath.blog}
            isOnTop={isOnTop()}
          >
            Blog
          </Link>
          <Link
            href={isOnHome() ? `${SitePath.beranda}#peta` : SitePath.peta}
            isOnTop={isOnTop()}
          >
            Peta
          </Link>
        </nav>
      </div>
    </div>
  );
}

interface LinkProps {
  href: string;
  isOnTop: boolean;
  children: string;
}

function Link(props: LinkProps) {
  return (
    <A
      href={props.href}
      class={`px-4 py-2 ${
        props.isOnTop
          ? "hover:bg-white"
          : "hover:bg-sea_serpent hover:text-white"
      } text-center rounded-2xl transition-color duration-300`}
    >
      {props.children}
    </A>
  );
}
