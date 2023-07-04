export default function Footer() {
  return (
    <div class="p-8 bg-gargoyle_gas">
      <div class="w-fit mx-auto flex items-center gap-x-12">
        <img
          src={import.meta.env.VITE_BASE_URL + "/src/assets/logo/ugm.webp"}
          class="w-32 h-32"
        />
        <img
          src={
            import.meta.env.VITE_BASE_URL + "/src/assets/logo/kkn-ppm-ugm.webp"
          }
          class="w-24 h-24"
        />
        <img
          src={
            import.meta.env.VITE_BASE_URL +
            "/src/assets/logo/bina-binongko.webp"
          }
          class="w-24 h-24"
        />
      </div>
      <div class="max-w-lg mt-8 mx-auto font-futura_pt">
        <span class="block text-center">
          Pemberdayaan Masyarakat Kepulauan untuk Optimalisasi Sumber Daya Alam
          dalam Peningkatan Kualitas Hidup Masyarakat dari Segi Sosial Kesehatan
          dan Edukasi Potensi Wisata kepada Masyarakat Lokal
        </span>
        <span class="mt-4 block text-center">
          Kecamatan Togo Binongko, Kabupaten Wakatobi, Provinsi Sulawesi
          Tenggara
        </span>
        <span class="block text-center">
          KKN-PPM UGM Bina Binongko Periode II Tahun 2023
        </span>
      </div>
      <div class="mt-8">
        <div>
          <span class="block font-futura_pt text-center">Didukung oleh</span>
        </div>
        <div class="w-fit mx-auto mt-2 flex items-center gap-x-4">
          <img
            src={import.meta.env.VITE_BASE_URL + "/src/assets/logo/pln.webp"}
            class="h-16"
          />
          <img
            src={
              import.meta.env.VITE_BASE_URL + "/src/assets/logo/pln-peduli.webp"
            }
            class="h-16"
          />
          <img
            src={
              import.meta.env.VITE_BASE_URL +
              "/src/assets/logo/gramedia-digital.webp"
            }
            class="h-16"
          />
          <img
            src={import.meta.env.VITE_BASE_URL + "/src/assets/logo/litara.webp"}
            class="h-16"
          />
        </div>
      </div>
    </div>
  );
}
