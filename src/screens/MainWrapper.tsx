import { Outlet, useLocation } from "@solidjs/router";
import Navbar from "../components/navbar/Navbar";
import { Show } from "solid-js";
import getPath from "../utils/getPath";
import { PathE } from "../enum/path";
import Footer from "../components/footer/Footer";

export default function MainWrapper() {
  const location = useLocation();

  return (
    <div class="mx-auto">
      <Navbar />

      <Show when={getPath(location.pathname) !== PathE.beranda}>
        <div class="h-32" />
      </Show>

      <Outlet />

      <div class="pt-20" />

      <Footer />
    </div>
  );
}
