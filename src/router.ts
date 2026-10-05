import { lazy, Loading, ParentComponent } from "solid-js";
import { createRouter } from "@solidjs/router";
import { AppLayout } from "./layout";

export const Router = createRouter({
  routes: [
    { path: "/", component: lazy(() => import("./pages/Landing")) },
    { path: "/app", component: AppLayout, children: [
        { path: "/", component: lazy(() => import("./pages/Home")) },
        { path: "/account", component: lazy(() => import("./pages/Account")) },
    ] },
    { path: "*404", component: lazy(() => import("./pages/NotFound")) },
  ],
});

export const { paths } = Router;