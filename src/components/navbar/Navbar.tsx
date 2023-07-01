import { A } from "@solidjs/router";
import SitePath from "../../data/sitePath";
import SiteInfo from "../../data/siteInfo";
import { createSignal, onCleanup, onMount } from "solid-js";

export default function Navbar() {
  const [isOnTop, setIsOnTop] = createSignal(checkIsOnTop());

  onMount(() => {
    const scrollListener = () => {
      setIsOnTop(checkIsOnTop());
    };

    document.addEventListener("scroll", scrollListener);
    onCleanup(() => {
      document.removeEventListener("scroll", scrollListener);
    });
  });

  function checkIsOnTop() {
    return window.scrollY < 100;
  }

  return (
    <div class="fixed z-50 w-full px-8 py-4">
      <div
        class="h-20 px-8 flex items-center justify-between bg-white transition-color duration-300 rounded-full overflow-hidden"
        classList={{ "bg-white/60": isOnTop(), "drop-shadow-lg": !isOnTop() }}
      >
        <div class="h-full flex gap-x-4 items-center">
          <img
            src="/src/assets/logo.png"
            alt="Logo Bina Binongko"
            loading="lazy"
            class="w-16 h-16"
          />
          <span class="font-poppins font-bold text-gargoyle_gas">
            {SiteInfo.title}
          </span>
        </div>
        <nav class="flex gap-x-1 font-poppins">
          <Link href={SitePath.home} isOnTop={isOnTop()}>
            Beranda
          </Link>
          <Link href={`${SitePath.home}#tempat-wisata`} isOnTop={isOnTop()}>
            Tempat Wisata
          </Link>
          <Link href={`${SitePath.home}#budaya-tradisi`} isOnTop={isOnTop()}>
            Budaya & Tradisi
          </Link>
          <Link href={`${SitePath.home}#kerajinan`} isOnTop={isOnTop()}>
            Kerajinan
          </Link>
          <Link href={SitePath.home} isOnTop={isOnTop()}>
            Galeri
          </Link>
          <Link href={SitePath.home} isOnTop={isOnTop()}>
            Blog
          </Link>
          <Link href={SitePath.home} isOnTop={isOnTop()}>
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
      } rounded-2xl transition-color duration-300`}
    >
      {props.children}
    </A>
  );
}
