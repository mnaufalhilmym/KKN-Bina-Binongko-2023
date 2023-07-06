import { A, useLocation } from "@solidjs/router";
import SitePath from "../../data/sitePath";
import SiteInfo from "../../data/siteInfo";
import {
  Show,
  createMemo,
  createRenderEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import getPath from "../../utils/getPath";
import { PathE } from "../../enum/path";
import logos from "../../contents/logos";
import IconMenu from "../icons/Menu";
import { useWindowSize } from "@solid-primitives/resize-observer";
import windowSizeConfig from "../../contants/windowSizeConfig";
import IconClose from "../icons/Close";

export default function Navbar() {
  const windowSize = useWindowSize();

  const location = useLocation<string>();

  const path = createMemo(() => getPath(location.pathname));

  const isOnHome = createMemo(() => path() === PathE.beranda);
  const [isOnTop, setIsOnTop] = createSignal(checkIsOnTopOfHome());

  const [isMobileNavOpen, setIsMobileNavOpen] = createSignal(false);

  createRenderEffect(() => {
    if (windowSize.width >= windowSizeConfig.lg) {
      setIsMobileNavOpen(false);
    }
  });

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

  function toggleMobileNav() {
    if (windowSize.width < windowSizeConfig.lg) {
      setIsMobileNavOpen((prev) => !prev);
    }
  }

  return (
    <>
      <div class="fixed z-50 w-full px-8 py-4">
        <div
          class="w-fit lg:w-full h-20 px-8 mx-auto flex lg:flex-row items-center justify-between transition-color duration-300 rounded-full overflow-hidden"
          classList={{
            "bg-white/60": isOnTop(),
            "bg-white drop-shadow-lg": !isOnTop(),
          }}
        >
          <div class="h-full flex gap-x-4 items-center">
            <img
              src={logos.bina_binongko.url}
              alt={logos.bina_binongko.alt}
              loading="lazy"
              class="w-16 h-16"
            />
            <span class="font-poppins font-bold text-gargoyle_gas">
              {SiteInfo.title}
            </span>
          </div>

          {/* Start of desktop nav */}
          <Show when={windowSize.width >= windowSizeConfig.lg}>
            <nav class="hidden lg:flex items-center gap-x-1 font-poppins">
              <NavLinks isOnTop={isOnTop()} isOnHome={isOnHome()} />
            </nav>
          </Show>
          {/* End of desktop nav */}
        </div>

        {/* Start of mobile nav larger than sm */}
        <Show
          when={
            windowSize.width >= 432 && windowSize.width < windowSizeConfig.lg
          }
        >
          <nav class="block lg:hidden absolute right-8 top-1/2 -translate-y-1/2">
            <button
              onclick={toggleMobileNav}
              class="flex p-4 rounded-full transition-color duration-300"
              classList={{
                "bg-white/60": isOnTop(),
                "bg-white drop-shadow-lg": !isOnTop(),
              }}
            >
              <Show
                when={isMobileNavOpen()}
                fallback={<IconMenu type="outline" class="w-5 h-5" />}
              >
                <IconClose type="outline" class="w-5 h-5" />
              </Show>
            </button>
            <Show when={isMobileNavOpen()}>
              <div
                onclick={() => setIsMobileNavOpen(false)}
                class="absolute right-0 w-64 mt-6 rounded-2xl transition-color duration-300"
                classList={{
                  "bg-white/60": isOnTop(),
                  "bg-white drop-shadow-lg": !isOnTop(),
                }}
              >
                <NavLinks isOnTop={isOnTop()} isOnHome={isOnHome()} />
              </div>
            </Show>
          </nav>
        </Show>
        {/* End of mobile nav larger than sm */}
      </div>

      {/* Start of mobile nav smaller than sm */}
      <Show when={windowSize.width < 432}>
        <nav class="block sm:hidden fixed z-50 right-8 bottom-4">
          <button
            onclick={toggleMobileNav}
            class="flex p-4 rounded-full transition-color duration-300"
            classList={{
              "bg-white/60": isOnTop(),
              "bg-white drop-shadow-lg": !isOnTop(),
            }}
          >
            <Show
              when={isMobileNavOpen()}
              fallback={<IconMenu type="outline" class="w-5 h-5" />}
            >
              <IconClose type="outline" class="w-5 h-5" />
            </Show>
          </button>
          <Show when={isMobileNavOpen()}>
            <div
              onclick={() => setIsMobileNavOpen(false)}
              class="absolute bottom-12 mb-7 right-0 w-64 mt-6 rounded-2xl transition-color duration-300"
              classList={{
                "bg-white/60": isOnTop(),
                "bg-white drop-shadow-lg": !isOnTop(),
              }}
            >
              <NavLinks isOnTop={isOnTop()} isOnHome={isOnHome()} />
            </div>
          </Show>
        </nav>
      </Show>
      {/* End of mobile nav smaller than sm */}
    </>
  );
}

interface NavLinksProps {
  isOnTop: boolean;
  isOnHome: boolean;
}

function NavLinks(props: NavLinksProps) {
  return (
    <>
      <Link href={SitePath.beranda} isOnTop={props.isOnTop}>
        Beranda
      </Link>
      <Link
        href={props.isOnHome ? `${SitePath.beranda}#wisata` : SitePath.wisata}
        isOnTop={props.isOnTop}
      >
        Tempat Wisata
      </Link>
      <Link
        href={
          props.isOnHome
            ? `${SitePath.beranda}#budaya-tradisi`
            : SitePath.budaya_tradisi
        }
        isOnTop={props.isOnTop}
      >
        Budaya & Tradisi
      </Link>
      <Link
        href={
          props.isOnHome
            ? `${SitePath.beranda}#industri-kerajinan`
            : SitePath.industri_kerajinan
        }
        isOnTop={props.isOnTop}
      >
        Industri & Kerajinan
      </Link>
      <Link
        href={props.isOnHome ? `${SitePath.beranda}#galeri` : SitePath.galeri}
        isOnTop={props.isOnTop}
      >
        Galeri
      </Link>
      <Link
        href={props.isOnHome ? `${SitePath.beranda}#blog` : SitePath.blog}
        isOnTop={props.isOnTop}
      >
        Blog
      </Link>
      <Link
        href={props.isOnHome ? `${SitePath.beranda}#peta` : SitePath.peta}
        isOnTop={props.isOnTop}
      >
        Peta
      </Link>
    </>
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
      class="block px-4 py-2  text-center rounded-2xl transition-color duration-300"
      classList={{
        "hover:bg-white": props.isOnTop,
        "hover:bg-sea_serpent hover:text-white": !props.isOnTop,
      }}
    >
      {props.children}
    </A>
  );
}
