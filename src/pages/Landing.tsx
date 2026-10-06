import { onCleanup, onSettled } from 'solid-js';
import { COLS, ROWS, comingFrame, marketFrame, glitchFrame, scanFrame } from './asciiScene';
import './Landing.css';

export default function Landing() {
  let canvas!: HTMLCanvasElement;
  let frame = 0;
  let disposed = false;

  onSettled(() => {
    if (disposed) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const start = performance.now();
    let lastPaint = -100;
    const animate = (now: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(animate);
      if (document.hidden || now - lastPaint < 65) return;
      lastPaint = now;
      const elapsed = (now - start) % 15200;
      const title = comingFrame(now - start, reducedMotion.matches);
      const market = marketFrame(now);
      let text = title;
      let glitching = false;
      if (elapsed >= 5000 && elapsed < 7600) {
        glitching = !reducedMotion.matches;
        text = reducedMotion.matches ? title : glitchFrame(title, market, (elapsed - 5000) / 2600);
      } else if (elapsed >= 7600 && elapsed < 12600) text = market;
      else if (elapsed >= 12600) {
        glitching = !reducedMotion.matches;
        text = reducedMotion.matches ? market : glitchFrame(market, title, (elapsed - 12600) / 2600);
      }
      const residual = elapsed < 900 || elapsed > 4200 && elapsed < 8500 || elapsed > 11800;
      if (!reducedMotion.matches) text = scanFrame(text, now, glitching ? .42 : residual ? .16 : .015);
      const width = canvas.clientWidth, height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.fillStyle = '#080b0d';
      context.fillRect(0, 0, width, height);
      const cellWidth = width / COLS, cellHeight = height / ROWS;
      const fontSize = Math.min(cellWidth / .61, cellHeight * .8);
      context.font = `${fontSize}px "Courier New", monospace`;
      context.textBaseline = 'middle';
      const marketScene = elapsed >= 7600 && elapsed < 12600;
      text.split('\n').forEach((row, y) => Array.from(row).forEach((char, x) => {
        if (char === ' ') return;
        const chart = marketScene && y >= 16 && y <= 22 && x >= 21 && x <= 79;
        const structural = '+-|'.includes(char);
        context.fillStyle = chart ? '#64e6b0' : char === '█' ? '#d7e5e7' : structural ? '#41606b' : marketScene && y === 14 ? '#81c9dd' : glitching ? (x % 5 === 0 ? '#ef8baf' : '#78cbd3') : '#a4b9c2';
        context.fillText(char, (x + .5) * cellWidth - fontSize * .3, (y + .5) * cellHeight);
      }));
      context.fillStyle = '#77bfc909';
      for (let row = 0; row < 32; row++) context.fillRect(0, row * height / 32, width, 1);
      if (!reducedMotion.matches) {
        context.fillStyle = glitching ? '#82ddd51a' : '#82ddd507';
        context.fillRect(0, (now / 18) % height, width, Math.max(1, height / 160));
      }
    };
    frame = requestAnimationFrame(animate);
  });
  onCleanup(() => { disposed = true; cancelAnimationFrame(frame); });

  return <main class="ascii-landing" aria-label="AKG Bets coming soon">
    <canvas ref={element => { canvas = element; }} class="ascii-screen" aria-hidden="true" />
    <span class="sr-only">Coming soon. A looping ASCII animation reveals a probability history chart.</span>
  </main>;
}
