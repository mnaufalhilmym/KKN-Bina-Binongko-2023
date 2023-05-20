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
    <div
      class="fixed z-50 w-full h-20 px-8 flex items-center justify-between bg-white transition-color duration-300"
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
      <nav class="flex gap-x-6 font-poppins">
        <A href={SitePath.home}>Beranda</A>
        <A href={`${SitePath.home}#tempat-wisata`}>Tempat Wisata</A>
        <A href={`${SitePath.home}#budaya-tradisi`}>Budaya & Tradisi</A>
        <A href={`${SitePath.home}#kerajinan`}>Kerajinan</A>
        <A href={SitePath.home}>Galeri</A>
        <A href={SitePath.home}>Blog</A>
        <A href={SitePath.home}>Peta</A>
      </nav>
    </div>
  );
}
