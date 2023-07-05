import logos from "../../contents/logos";

export default function Footer() {
  return (
    <div class="p-8 bg-gargoyle_gas">
      <div class="w-fit mx-auto flex items-center gap-x-12">
        <img src={logos.ugm.url} alt={logos.ugm.alt} class="w-32 h-32" />
        <img
          src={logos.kkn_ppm_ugm.url}
          alt={logos.kkn_ppm_ugm.alt}
          loading="lazy"
          class="w-24 h-24"
        />
        <img
          src={logos.bina_binongko.url}
          alt={logos.bina_binongko.alt}
          loading="lazy"
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
            src={logos.pln.url}
            alt={logos.pln.alt}
            loading="lazy"
            class="h-16"
          />
          <img
            src={logos.pln_peduli.url}
            alt={logos.pln_peduli.alt}
            loading="lazy"
            class="h-16"
          />
          <img
            src={logos.gramedia_digital.url}
            alt={logos.gramedia_digital.alt}
            loading="lazy"
            class="h-16"
          />
          <img
            src={logos.litara.url}
            alt={logos.litara.alt}
            loading="lazy"
            class="h-16"
          />
        </div>
      </div>
    </div>
  );
}
