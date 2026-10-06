import type { ParentProps } from 'solid-js';
import { HydrationScript } from '@solidjs/web';


import type { CustomElements, CustomCssProperties } from '@awesome.me/webawesome/dist/custom-elements-jsx.d.ts';
import { darkMode } from './helper';
declare module '@solidjs/web' {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  interface CSSProperties extends CustomCssProperties {}
}



// The document shell (the index.html replacement), picked up by the
// src/Document.* convention; it must render the full <html> and ships no
// client JS. <HydrationScript /> is stripped from the prerendered shell in
// client mode and activates under `ssr: true`. Delete this file to fall
// back to the plugin's built-in shell.
export default function Document(props: ParentProps) {
  return (
    <html lang="en" class="wa-theme-awesome wa-brand-blue">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Solid App</title>
        <HydrationScript />
      </head>
      <body style={{ margin: 0, padding: 0, height: '100svh' }}>{props.children}</body>
    </html>
  );
}
