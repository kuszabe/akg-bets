import { Loading, ParentComponent } from "solid-js";
import Navbar from "./Navbar";
import styles from "./layout.module.css";
import { paths } from "./router";

export const HomeLayout: ParentComponent = (props) => (
    <>
      <Navbar />
      <main>
          {props.children}
      </main>
    </>
);

export const SubpageLayout: ParentComponent<{pagename: string}> = (props) => (
  <>
    <nav>
      <span style="font-size: 1.2rem;">
          <wa-button href={paths.home()} appearance="plain"><wa-icon name="caret-left"></wa-icon></wa-button>
          <b>{props.pagename}</b>
      </span>
      <span></span>
    </nav>
    <main>
      {props.children}
    </main>
  </>
)

export const EmptyLayout: ParentComponent = (props) => (
  <Loading fallback={<main>Loading…</main>}>
    {props.children}
  </Loading>
);