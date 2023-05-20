import { RouteDefinition, useRoutes } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import SitePath from "./data/sitePath";

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

  return <Routes />;
};

export default App;
