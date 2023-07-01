import { RouteDefinition, useRoutes } from "@solidjs/router";
import { Component, createRenderEffect, lazy } from "solid-js";
import SitePath from "./data/sitePath";
import LoadingState from "./state/loadingState";
import Head from "./components/head/Head";
import SiteHead from "./state/siteHead";

const routes: RouteDefinition[] = [
  {
    path: SitePath.base,
    component: lazy(() => import("./screens/MainWrapper")),
    children: [
      {
        path: "/",
        component: lazy(() => import("./screens/HomeScreen")),
      },
    ],
  },
];

const App: Component = () => {
  const Routes = useRoutes(routes);

  createRenderEffect(() => {
    LoadingState.init(false);
    SiteHead.init();
  });

  return (
    <>
      <Head />
      <Routes />
    </>
  );
};

export default App;
