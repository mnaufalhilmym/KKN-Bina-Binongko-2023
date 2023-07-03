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
      <div class="max-w-lg mt-4 mx-auto font-futura_pt">
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
    </div>
  );
}
