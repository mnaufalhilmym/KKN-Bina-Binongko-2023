export default class SitePath {
  private static _base = import.meta.env.VITE_BASE_URL;

  static base = SitePath._base ?? "/";
  static beranda = SitePath.base;
  static wisata = SitePath.base + "/wisata";
  static budaya_tradisi = SitePath.base + "/budaya-tradisi";
  static industri_kerajinan = SitePath.base + "/industri-kerajinan";
  static galeri = SitePath.base + "/galeri";
  static blog = SitePath.base + "/blog";
  static peta = SitePath.base + "/peta";
}
