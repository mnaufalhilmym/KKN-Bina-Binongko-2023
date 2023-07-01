import Video from "../components/video/Video";
import siteImages from "../contents/images";
import siteVideos from "../contents/videos";
import Footer from "../components/footer/Footer";
import Content from "../components/content/HomeContentSection";
import { GqlClient } from "../api/gqlClient";
import { gql } from "@apollo/client/core";
import {
  For,
  Show,
  createRenderEffect,
  createSignal,
  getOwner,
} from "solid-js";
import SiteHead from "../state/siteHead";
import { CenterModal } from "../components/modal/CenterModal";

async function fetchHome() {
  const client = GqlClient.client;

  try {
    const res = await client.query<{
      wisatas: { data: WisataI[] };
      budayas: { data: BudayaI[] };
      industris: { data: IndustriI[] };
    }>({
      query: gql`
        query Home {
          wisatas(sort: "publishedAt:asc") {
            data {
              id
              attributes {
                nama
                lokasi
                foto {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                deskripsi
              }
            }
          }
          budayas(sort: "publishedAt:asc") {
            data {
              id
              attributes {
                nama
                foto {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                deskripsi
              }
            }
          }
          industris(sort: "publishedAt:asc") {
            data {
              id
              attributes {
                nama
                foto {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                deskripsi
              }
            }
          }
        }
      `,
    });

    if (res.errors) throw res.errors;

    return {
      wisata: res.data.wisatas.data,
      budaya: res.data.budayas.data,
      industri: res.data.industris.data,
    };
  } catch (e) {
    console.error("Error when fetching home data");
    console.error(e);
  }
}

export default function HomeScreen() {
  const [isLoading, setIsLoading] = createSignal(true);
  const [isError, setIsError] = createSignal(false);
  const [wisata, setWisata] = createSignal<WisataI[]>([]);
  const [budaya, setBudaya] = createSignal<BudayaI[]>([]);
  const [industri, setIndustri] = createSignal<IndustriI[]>([]);
  const owner = getOwner();
  const ContentModalLayer = new CenterModal({ owner, cardClass: "w-2/3" });

  createRenderEffect(() => {
    SiteHead.title = "Beranda";
  });

  createRenderEffect(async () => {
    const data = await fetchHome();

    if (!data) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    setWisata(data.wisata);
    setBudaya(data.budaya);
    setIndustri(data.industri);

    setIsLoading(false);
  });

  function showModalContent(content: ModalHomeContentProps) {
    ContentModalLayer.content = { element: ModalContent, props: [content] };
    ContentModalLayer.isShow = true;
  }

  return (
    <>
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
      <div class="pt-28 px-32 flex gap-x-8 items-center">
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
      <Show when={isLoading() || (!isLoading() && wisata().length > 0)}>
        <div id="tempat-wisata" class="pt-28 px-32">
          <Content
            title1="Jelajahi"
            title2="Destinasi Wisata"
            contents={wisata()}
            isLoading={isLoading()}
            onClickContent={showModalContent}
          />
        </div>
      </Show>
      {/* End of jelajahi togo binongko */}

      {/* Start of budaya dan tradisi */}
      <Show when={isLoading() || (!isLoading() && budaya().length > 0)}>
        <div id="budaya-tradisi" class="pt-28 px-32">
          <Content
            title1="Nikmati"
            title2="Budaya dan Tradisi"
            contents={budaya()}
            isLoading={isLoading()}
            onClickContent={showModalContent}
          />
        </div>
      </Show>
      {/* End of budaya dan tradisi */}

      {/* Start of industri kerajinan */}
      <Show when={isLoading() || (!isLoading() && industri().length > 0)}>
        <div id="kerajinan" class="pt-28 px-32">
          <Content
            title1="Kenali"
            title2="Industri Kerajinan"
            contents={industri()}
            isLoading={isLoading()}
            onClickContent={showModalContent}
          />
        </div>
      </Show>
      {/* End of industri kerajinan */}

      <div class="pt-28" />

      <Footer />

      {/* Modal */}
      {ContentModalLayer.render()}
    </>
  );
}

function ModalContent(props: ModalHomeContentProps) {
  return (
    <>
      <div>
        <span class="block font-poppins font-bold text-3xl text-center">
          {props.title}
        </span>
      </div>
      <Show when={props.subtitle}>
        <div>
          <span class="block font-futura_pt text-center">{props.subtitle}</span>
        </div>
      </Show>
      <div class="mt-8 flex gap-x-4">
        <div>
          <For each={props.imgUrls}>
            {(imgUrl) => (
              <img src={import.meta.env.VITE_BACKEND_ENDPOINT + imgUrl} />
            )}
          </For>
        </div>
        <div>{props.description}</div>
      </div>
    </>
  );
}
