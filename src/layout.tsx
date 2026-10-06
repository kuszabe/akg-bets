import { Loading, ParentComponent } from "solid-js";
import Navbar from "./Navbar";
import styles from "./layout.module.css";

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

export const TestDesktopLayout: ParentComponent = (props) => (
  <wa-page class={styles.page}>
    <header slot="header">
      <b>AKGbets</b>
    </header>

    <nav slot="navigation">
      <wa-button appearance="plain" href="#">Valami</wa-button>
      <wa-button appearance="plain" href="#">Valami</wa-button>
      <wa-button appearance="plain" href="#">Valami</wa-button>
    </nav>

    <nav slot="navigation-footer">
      <wa-button appearance="plain" href="#">Valami</wa-button>
      <wa-button appearance="plain" href="#">Valami</wa-button>
      <wa-button appearance="plain" href="#">Valami</wa-button>
    </nav>

    
    {props.children}
  </wa-page>
)