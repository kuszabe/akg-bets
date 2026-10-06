import { lazy, Loading, ParentComponent } from "solid-js";
import { createRouter } from "@solidjs/router";
import { AppLayout, TestDesktopLayout } from "./layout";

const chosenLayout = TestDesktopLayout

export const Router = createRouter({
  routes: [
    { path: "/", component: lazy(() => import("./pages/Landing")) },
    { path: "/app", component: chosenLayout, children: [
        { path: "/", component: lazy(() => import("./pages/Home")) },
        { path: "/account", component: lazy(() => import("./pages/Account")) },
    ] },
    { path: "*404", component: lazy(() => import("./pages/NotFound")) },
  ],
});

export const { paths } = Router;