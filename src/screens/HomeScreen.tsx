import { For, Show } from "solid-js";
import Head from "../components/head/Head";
import Navbar from "../components/navbar/Navbar";
import Video from "../components/video/Video";
import siteImages from "../data/siteImages";
import siteVideos from "../data/siteVideos";
import tempatWisata from "../contents/tempatWisata";
import IconLocation from "../components/icons/Location";
import tradisiBudaya from "../contents/tradisiBudaya";
import kerajinan from "../contents/kerajinan";
import Footer from "../components/footer/Footer";

export default function HomeScreen() {
  return (
    <>
      <Head title="Beranda" />

      <Navbar />

      {/* Start of hero banner */}
      <div class="relative max-w-screen max-h-screen overflow-hidden flex items-center justify-center">
        <img
          src={siteImages.aerial_view.url}
          alt={siteImages.aerial_view.alt}
          class="brightness-[0.8]"
        />
        <div class="absolute text-white drop-shadow-2xl">
          <div>
            <span class="font-tahu text-5xl">KKN-PPM UGM 2023</span>
          </div>
          <div>
            <span class="font-poppins font-bold text-9xl">Bina Binongko</span>
          </div>
        </div>
      </div>
      {/* End of hero banner */}

      {/* Start of mengenal togo binongko */}
      <div class="pt-28 px-32 flex gap-x-6 items-center">
        <div class="flex-1 border rounded-xl overflow-hidden">
          <Video src={siteVideos.after_movie.url} type="video/webm" />
        </div>
        <div class="flex-1">
          <div>
            <div>
              <span class="font-tahu text-2xl text-sea_serpent">Mengenal</span>
            </div>
            <div>
              <span class="font-poppins font-bold text-3xl">Togo Binongko</span>
            </div>
          </div>
          <div class="mt-4">
            <p class="font-futura_pt">
              Togo Binongko merupakan kecamatan yang terletak di Kepulauan
              Wakatobi. Kecamatan ini memiliki beberapa kelurahan, dua di
              antaranya adalah Kelurahan Sowa dan Popalia. Keduanya terletak
              pada gugusan Kepulauan Wakatobi yang terdapat pada Pulau Binongko.
            </p>
          </div>
        </div>
      </div>
      {/* End of mengenal togo binongko */}

      {/* Start of jelajahi togo binongko */}
      <div id="tempat-wisata" class="pt-28 px-32">
        <HorizontalContent
          title1="Jelajahi"
          title2="Destinasi Wisata"
          contents={tempatWisata}
        />
      </div>
      {/* End of jelajahi togo binongko */}

      {/* Start of budaya dan tradisi */}
      <div id="budaya-tradisi" class="pt-28 px-32">
        <HorizontalContent
          title1="Nikmati"
          title2="Budaya dan Tradisi"
          contents={tradisiBudaya}
        />
      </div>
      {/* End of budaya dan tradisi */}

      {/* Start of industri kerajinan */}
      <div id="kerajinan" class="pt-28 px-32">
        <HorizontalContent
          title1=""
          title2="Industri Kerajinan"
          contents={kerajinan}
        />
      </div>
      {/* End of industri kerajinan */}

      <div class="pt-28"/>

      <Footer />
    </>
  );
}

interface HorizontalContentProps {
  title1: string;
  title2: string;
  contents: { name: string; location?: string; imageUrls: string[] }[];
}

function HorizontalContent(props: HorizontalContentProps) {
  return (
    <>
      <div>
        <div>
          <span class="font-tahu text-2xl text-sea_serpent">
            {props.title1}
          </span>
        </div>
        <div>
          <span class="font-poppins font-bold text-3xl">{props.title2}</span>
        </div>
      </div>
      <div class="mt-6 flex flex-wrap gap-8">
        <For each={props.contents}>
          {(dest) => (
            <div class="w-60 group relative rounded-2xl overflow-hidden">
              <Show when={dest.location}>
                <div class="absolute z-10 top-2 right-2 flex items-center gap-x-1 px-2 py-1 rounded-full bg-sea_serpent text-white">
                  <IconLocation class="w-6 h-6" />
                  <span class="font-futura_pt font-medium text-sm">
                    {dest.location}
                  </span>
                </div>
              </Show>
              <img
                src={dest.imageUrls[0]}
                alt={dest.name}
                class="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
              <div class="absolute bottom-0 z-10 w-full flex items-center justify-between p-4">
                <span class="font-futura_pt text-xl text-white">
                  {dest.name}
                </span>
                {/* <div class="w-6 h-6">
          <IconArrowForwardCircle
            type="outline"
            class="absolute w-6 h-6 opacity-100 group-hover:opacity-0 transition-opacity"
          />
          <IconArrowForwardCircle
            type="filled"
            class="absolute w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div> */}
              </div>
              <div class="absolute bottom-0 w-full h-28 bg-gradient-to-b from-transparent to-sea_serpent to-80%" />
            </div>
          )}
        </For>
      </div>
    </>
  );
}
