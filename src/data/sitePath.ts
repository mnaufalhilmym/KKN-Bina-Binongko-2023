export default class SitePath {
  private static _base = import.meta.env.VITE_BASE_URL;

  static base = SitePath._base ?? "/";
  static home = SitePath.base;
}
