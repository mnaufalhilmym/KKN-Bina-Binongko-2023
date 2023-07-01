import { Outlet } from "@solidjs/router";
import Navbar from "../components/navbar/Navbar";

export default function MainWrapper() {
  return (
    <div class="mx-auto">
      <Navbar />

      <Outlet />
    </div>
  );
}
