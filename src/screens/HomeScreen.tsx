import Video from "../components/video/Video";
import siteImages from "../contents/images";
import siteVideos from "../contents/videos";
import Content from "../components/content/HomeContentSection";
import { GqlClient } from "../api/gqlClient";
import { gql } from "@apollo/client/core";
import { Show, createRenderEffect, createSignal, getOwner } from "solid-js";
import SiteHead from "../state/siteHead";
import CenterModal from "../components/modal/CenterModalWrapper";
import Gallery from "../components/content/HomeGallerySection";
import Blog from "../components/content/HomeBlogSection";
import Map from "../components/content/HomeMapSection";
import SitePath from "../data/sitePath";
import { defaultPagination } from "../types/defaultValue/pagination";
import ModalContent from "../components/modal/ContentModal";

async function fetchHome() {
  const client = GqlClient.client;

  try {
    const res = await client.query<{
      wisatas: { meta: { pagination: PaginationI }; data: WisataI[] };
      budayas: { meta: { pagination: PaginationI }; data: BudayaI[] };
      industris: { meta: { pagination: PaginationI }; data: IndustriI[] };
      galeris: { meta: { pagination: PaginationI }; data: GaleriI[] };
      blogs: { data: BlogI[] };
    }>({
      query: gql`
        query Home {
          wisatas(sort: "publishedAt:asc", pagination: { limit: 4 }) {
            meta {
              pagination {
                total
                pageSize
              }
            }
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
          budayas(sort: "publishedAt:asc", pagination: { limit: 4 }) {
            meta {
              pagination {
                total
                pageSize
              }
            }
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
          industris(sort: "publishedAt:asc", pagination: { limit: 4 }) {
            meta {
              pagination {
                total
                pageSize
              }
            }
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
                kontak
                nama_kontak
              }
            }
          }
          galeris(sort: "publishedAt:asc", pagination: { limit: 8 }) {
            meta {
              pagination {
                total
                pageSize
              }
            }
            data {
              attributes {
                foto {
                  data {
                    attributes {
                      url
                    }
                  }
                }
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

    return {
      wisata: {
        pagination: res.data.wisatas.meta.pagination,
        data: res.data.wisatas.data,
      },
      budaya: {
        pagination: res.data.budayas.meta.pagination,
        data: res.data.budayas.data,
      },
      industri: {
        pagination: res.data.industris.meta.pagination,
        data: res.data.industris.data,
      },
      galeri: {
        pagination: res.data.galeris.meta.pagination,
        data: res.data.galeris.data,
      },
      blog: res.data.blogs.data,
    };
  } catch (e) {
    console.error("Error when fetching home data");
    console.error(e);
  }
}

export default function HomeScreen() {
  const [isLoading, setIsLoading] = createSignal(false);
  const [isError, setIsError] = createSignal(false);
  const [wisata, setWisata] = createSignal<{
    pagination: PaginationI;
    data: WisataI[];
  }>({ pagination: defaultPagination, data: [] });
  const [budaya, setBudaya] = createSignal<{
    pagination: PaginationI;
    data: BudayaI[];
  }>({ pagination: defaultPagination, data: [] });
  const [industri, setIndustri] = createSignal<{
    pagination: PaginationI;
    data: IndustriI[];
  }>({ pagination: defaultPagination, data: [] });
  const [galeri, setGaleri] = createSignal<{
    pagination: PaginationI;
    data: GaleriI[];
  }>({ pagination: defaultPagination, data: [] });
  const [blog, setBlog] = createSignal<BlogI[]>([]);
  const ContentModalWrapper = new CenterModal({
    owner: getOwner(),
    cardClass: "w-2/3",
  });

  createRenderEffect(() => {
    SiteHead.title = "Beranda";
  });

  createRenderEffect(async () => {
    setIsLoading(true);

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

  function showModalContent(content: ModalContentProps) {
    ContentModalWrapper.content = { element: ModalContent, props: [content] };
    ContentModalWrapper.isShow = true;
  }

  return (
    <>
      {/* Start of hero banner */}
      <div class="relative max-w-screen max-h-screen overflow-hidden flex items-center justify-center">
        <img
          src={import.meta.env.VITE_BASE_URL + siteImages.aerial_view.url}
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
      <Show when={isLoading() || (!isLoading() && wisata().data.length > 0)}>
        <div id="wisata" class="pt-28 px-32">
          <Content
            title1="Jelajahi"
            title2="Destinasi Wisata"
            contents={wisata()}
            readMoreHref={SitePath.wisata}
            isLoading={isLoading()}
            onClickContent={showModalContent}
          />
        </div>
      </Show>
      {/* End of jelajahi togo binongko */}

      {/* Start of budaya dan tradisi */}
      <Show when={isLoading() || (!isLoading() && budaya().data.length > 0)}>
        <div id="budaya-tradisi" class="pt-28 px-32">
          <Content
            title1="Nikmati"
            title2="Budaya dan Tradisi"
            contents={budaya()}
            readMoreHref={SitePath.budaya_tradisi}
            isLoading={isLoading()}
            onClickContent={showModalContent}
          />
        </div>
      </Show>
      {/* End of budaya dan tradisi */}

      {/* Start of industri dan kerajinan */}
      <Show when={isLoading() || (!isLoading() && industri().data.length > 0)}>
        <div id="industri-kerajinan" class="pt-28 px-32">
          <Content
            title1="Kenali"
            title2="Industri dan Kerajinan"
            contents={industri()}
            readMoreHref={SitePath.industri_kerajinan}
            isLoading={isLoading()}
            onClickContent={showModalContent}
          />
        </div>
      </Show>
      {/* End of industri dan kerajinan */}

      {/* Start of galeri */}
      <Show when={isLoading() || (!isLoading() && galeri().data.length > 0)}>
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
          <Blog title1="" title2="Blog" blog={blog()} isLoading={isLoading()} />
        </div>
      </Show>
      {/* End of blog */}

      {/* Start of peta */}
      <div id="peta" class="pt-28 px-32">
        <Map title1="" title2="Peta" />
      </div>
      {/* End of peta */}

      {/* Modal */}
      {ContentModalWrapper.render()}
    </>
  );
}
