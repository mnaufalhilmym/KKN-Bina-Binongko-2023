import { RouteDefinition, useRoutes } from "@solidjs/router";
import { Component, createRenderEffect, lazy } from "solid-js";
import SitePath from "./data/sitePath";
import Head from "./components/head/Head";
import SiteHead from "./state/siteHead";
import { marked } from "marked";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import getLastScreenPath from "./utils/getLastScreenPath";

const routes: RouteDefinition[] = [
  {
    path: SitePath.base,
    component: lazy(() => import("./screens/MainWrapper")),
    children: [
      {
        path: "/",
        component: lazy(() => import("./screens/HomeScreen")),
      },
      {
        path: getLastScreenPath(SitePath.wisata),
        component: lazy(() => import("./screens/wisata/WisataScreen")),
      },
      {
        path: getLastScreenPath(SitePath.budaya_tradisi),
        component: lazy(
          () => import("./screens/budaya_tradisi/BudayaTradisiScreen")
        ),
      },
      {
        path: getLastScreenPath(SitePath.industri_kerajinan),
        component: lazy(
          () => import("./screens/industri_kerajinan/IndustriKerajinanScreen")
        ),
      },
      {
        path: getLastScreenPath(SitePath.galeri),
        component: lazy(() => import("./screens/galeri/GaleriScreen")),
      },
      {
        path: getLastScreenPath(SitePath.blog),
        children: [
          {
            path: "/",
            component: lazy(() => import("./screens/blog/BlogScreen")),
          },
          {
            path: "/:id",
            component: lazy(() => import("./screens/blog/BlogDetailScreen")),
          },
        ],
      },
      {
        path: getLastScreenPath(SitePath.peta),
        component: lazy(() => import("./screens/peta/PetaScreen")),
      },
    ],
  },
];

const App: Component = () => {
  const Routes = useRoutes(routes);

  createRenderEffect(() => {
    SiteHead.init();
    marked.use(mangle(), gfmHeadingId());
  });

  return (
    <>
      <Head />
      <Routes />
    </>
  );
};

export default App;
