import { Outlet } from "@solidjs/router";

export default function MainWrapper() {
  return (
    <div class="max-w-screen-2xl mx-auto">
      <Outlet />
    </div>
  );
}
