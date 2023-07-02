import Video from "../components/video/Video";
import siteImages from "../contents/images";
import siteVideos from "../contents/videos";
import Footer from "../components/footer/Footer";
import Content from "../components/content/HomeContentSection";
import { GqlClient } from "../api/gqlClient";
import { gql } from "@apollo/client/core";
import { Show, createRenderEffect, createSignal, getOwner } from "solid-js";
import SiteHead from "../state/siteHead";
import { CenterModal } from "../components/modal/CenterModal";
import PhotoSlider from "../components/slider/PhotoSlider";
import IconLocation from "../components/icons/Location";
import Gallery from "../components/content/HomeGallerySection";
import Blog from "../components/content/HomeBlogSection";
import Map from "../components/content/HomeMapSection";

async function fetchHome() {
  const client = GqlClient.client;

  try {
    const res = await client.query<{
      wisatas: { data: WisataI[] };
      budayas: { data: BudayaI[] };
      industris: { data: IndustriI[] };
      galeris: { data: GaleriI[] };
      blogs: { data: BlogI[] };
    }>({
      query: gql`
        query Home {
          wisatas(sort: "publishedAt:asc") {
            data {
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
          galeris(sort: "publishedAt:asc") {
            data {
              attributes {
                judul
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
          blogs(sort: "publishedAt:asc") {
            data {
              attributes {
                judul
                konten
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
      galeri: res.data.galeris.data,
      blog: res.data.blogs.data,
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
  const [galeri, setGaleri] = createSignal<GaleriI[]>([]);
  const [blog, setBlog] = createSignal<BlogI[]>([]);
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
    setGaleri(data.galeri);
    setBlog(data.blog);

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

      {/* Start of galeri */}
      <Show when={isLoading() || (!isLoading() && galeri().length > 0)}>
        <div id="galeri" class="pt-28 px-32">
          <Gallery
            title1=""
            title2="Galeri"
            galeri={galeri()}
            isLoading={isLoading()}
          />
        </div>
      </Show>
      {/* End of galeri */}

      {/* Start of blog */}
      <Show when={isLoading() || (!isLoading() && blog().length > 0)}>
        <div id="blog" class="pt-28 px-32">
          <Blog
            title1=""
            title2="Blog"
            blog={blog()}
            isLoading={isLoading()}
          />
        </div>
      </Show>
      {/* End of blog */}

      {/* Start of peta */}
      <Show when={isLoading() || (!isLoading() && blog().length > 0)}>
        <div id="peta" class="pt-28 px-32">
          <Map
            title1=""
            title2="Peta"
          />
        </div>
      </Show>
      {/* End of peta */}

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
        <div class="flex justify-center items-center gap-x-1">
          <span>
            <IconLocation class="w-5 h-5 text-sea_serpent" />
          </span>
          <span class="block font-futura_pt text-center">{props.subtitle}</span>
        </div>
      </Show>
      <div class="mt-8 flex gap-x-6">
        <div class="flex-1">
          <PhotoSlider imgUrls={props.imgUrls} />
        </div>
        <div class="p-4 flex-1 bg-gargoyle_gas/20 font-futura_pt shadow-md rounded-3xl">
          <div>
            <span>Deskripsi:</span>
          </div>
          <div>
            <span>{props.description}</span>
          </div>
        </div>
      </div>
    </>
  );
}
