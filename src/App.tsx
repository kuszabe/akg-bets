import { Loading, onSettled } from "solid-js";
import { Router } from "./router";
import { Center, darkMode } from "./helper";

import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/styles/themes/awesome.css';

import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/card/card.js';
import '@awesome.me/webawesome/dist/components/spinner/spinner.js';
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import '@awesome.me/webawesome/dist/components/switch/switch.js';
import '@awesome.me/webawesome/dist/components/callout/callout.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/page/page.js';

import "./App.css";

export default function App() {
  onSettled(() => {
    if (darkMode()) {
      document.documentElement.classList.add('wa-dark');
    }
  })

  return (
    <Router>
      {(props) => (
        <Loading fallback={<Center><wa-spinner></wa-spinner></Center>}>
          {props.children}
        </Loading>
      )}
    </Router>
  );
}
