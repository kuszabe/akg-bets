import { Loading, ParentComponent } from "solid-js";
import Navbar from "./Navbar";

export const AppLayout: ParentComponent = (props) => (
    <>
        <Navbar />
        <main>
            {props.children}
        </main>
    </>
);

export const EmptyLayout: ParentComponent = (props) => (
  <Loading fallback={<main>Loading…</main>}>
    {props.children}
  </Loading>
);
