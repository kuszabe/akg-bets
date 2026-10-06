import { onCleanup, onSettled } from 'solid-js';
import { COLS, ROWS, comingFrame, marketFrame, loopPhase, interferenceFrame, scanFrame, chartPoints, chartValue } from './asciiScene';
import './Landing.css';

export default function Landing() {
  let canvas!: HTMLCanvasElement;
  let choices!: HTMLDivElement;
  let previewVisible = false;
  let pointerX: number | null = null;
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
      const width = canvas.clientWidth, height = canvas.clientHeight;
      const compact = width < 640;
      const cols = compact ? 48 : COLS;
      const phase = loopPhase(now - start);
      const title = comingFrame(now - start, reducedMotion.matches, cols);
      const market = marketFrame(now, cols);
      const glitching = phase.transition && !reducedMotion.matches;
      const intensity = glitching ? phase.intensity : 0;
      let text = phase.market ? market : title;
      if (!reducedMotion.matches) text = scanFrame(text, now, .015 + intensity * .635);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.fillStyle = '#080b0d';
      context.fillRect(0, 0, width, height);
      // Scan columns always span the viewport; only the scene composition
      // and vertical spacing change for compact screens.
      const padding = Math.max(12, Math.min(width, height) * .035);
      const fontSize = Math.min((width - padding * 2) / (cols * .61), (height - padding * 2) / (ROWS * 1.4), 20);
      const cellWidth = width / cols;
      const cellHeight = compact ? fontSize * 1.4 : height / ROWS;
      const offsetX = 0;
      const offsetY = (height - ROWS * cellHeight) / 2;
      context.font = `${fontSize}px "Courier New", monospace`;
      context.textBaseline = 'middle';
      const marketScene = phase.market;
      if (previewVisible !== marketScene) {
        previewVisible = marketScene;
        choices.hidden = !marketScene;
        if (!marketScene) choices.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', 'false'));
      }
      choices.style.opacity = String(1 - intensity);
      choices.querySelectorAll('button').forEach(button => { button.disabled = phase.transition; });
      choices.style.width = `${(compact ? (cols - 7) / cols : .65) * width}px`;
      const buttonHeight = choices.getBoundingClientRect().height || 44;
      // Center the entire chart-and-buttons group, not just the ASCII grid.
      const marketOffsetY = (height - (18 * cellHeight + buttonHeight)) / 2 - 12 * cellHeight;
      const sceneOffsetY = marketScene ? marketOffsetY : offsetY;
      choices.style.top = `${marketOffsetY + 30 * cellHeight}px`;
      context.globalAlpha = 1 - intensity * .95;
      text.split('\n').forEach((row, y) => Array.from(row).forEach((char, x) => {
        if (char === ' ') return;
        const chart = marketScene && y >= 16 && y <= 22 && x >= (compact ? 7 : 21) && x <= (compact ? cols - 7 : 79);
        const structural = '+-|'.includes(char);
        context.fillStyle = chart ? '#64e6b0' : char === '█' ? '#d7e5e7' : structural ? '#41606b' : marketScene && y === 14 ? '#81c9dd' : '#a4b9c2';
        context.fillText(char, offsetX + (x + .5) * cellWidth - fontSize * .3, sceneOffsetY + (y + .5) * cellHeight);
      }));
      if (marketScene && !phase.transition && pointerX !== null) {
        const leftColumn = compact ? 7 : 21;
        const pointCount = chartPoints(cols).length;
        const left = (leftColumn + .5) * cellWidth;
        const right = (leftColumn + pointCount - .5) * cellWidth;
        const cursorX = pointerX * width;
        if (cursorX >= left - cellWidth / 2 && cursorX <= right + cellWidth / 2) {
          const value = chartValue((cursorX - left) / (right - left), cols);
          const pointX = (leftColumn + value.index + .5) * cellWidth;
          const pointY = marketOffsetY + (value.row + .5) * cellHeight;
          context.strokeStyle = '#81c9dd88';
          context.lineWidth = 1;
          context.setLineDash([3, 5]);
          context.beginPath();
          context.moveTo(cursorX, marketOffsetY + 16 * cellHeight);
          context.lineTo(cursorX, marketOffsetY + 24 * cellHeight);
          context.stroke();
          context.setLineDash([]);
          context.fillStyle = '#64e6b0';
          context.beginPath();
          context.arc(pointX, pointY, Math.max(2, fontSize * .18), 0, Math.PI * 2);
          context.fill();
          const label = `[ ${value.probability}% ]`;
          const labelWidth = context.measureText(label).width + 12;
          const labelX = Math.max(left, Math.min(cursorX - labelWidth / 2, right - labelWidth));
          const labelY = marketOffsetY + 15.5 * cellHeight;
          context.fillStyle = '#080b0d';
          context.fillRect(labelX, labelY - fontSize * .65, labelWidth, fontSize * 1.3);
          context.fillStyle = '#81c9dd';
          context.fillText(label, labelX + 6, labelY);
        }
      }
      context.globalAlpha = 1;
      if (glitching) {
        // Fade fullscreen interference in and out around the scene switch.
        context.globalAlpha = intensity;
        context.fillStyle = '#080b0d';
        context.fillRect(0, 0, width, height);
        const rows = interferenceFrame(cols, Math.random, .03 + intensity * .45).split('\n');
        rows.forEach((row, y) => {
          const shift = Math.round(Math.sin(now / 70 + y) * 3);
          Array.from(row).forEach((char, x) => {
            if (char === ' ') return;
            context.fillStyle = (x + y) % 7 === 0 ? '#ee8caf' : '#71c5cc';
            context.fillText(char, ((x + shift + cols) % cols + .5) * width / cols - fontSize * .3, (y + .5) * height / ROWS);
          });
        });
      }
      context.globalAlpha = 1;
      context.fillStyle = '#77bfc909';
      for (let row = 0; row < 32; row++) context.fillRect(0, row * height / 32, width, 1);
      if (!reducedMotion.matches) {
        context.globalAlpha = .25 + intensity * .75;
        context.fillStyle = '#82ddd51a';
        context.fillRect(0, (now / 18) % height, width, Math.max(1, height / 160));
        context.globalAlpha = 1;
      }
    };
    frame = requestAnimationFrame(animate);
  });
  onCleanup(() => { disposed = true; cancelAnimationFrame(frame); });

  const selectPreview = (event: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    choices.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', button === event.currentTarget ? 'true' : 'false'));
  };

  const inspectChart = (event: PointerEvent & { currentTarget: HTMLCanvasElement }) => {
    const bounds = canvas.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width;
    if (event.type === 'pointerdown') canvas.setPointerCapture(event.pointerId);
  };

  return <main class="ascii-landing" aria-label="AKG Bets coming soon">
    <canvas ref={element => { canvas = element; }} class="ascii-screen" aria-hidden="true" onPointerMove={inspectChart} onPointerDown={inspectChart} onPointerLeave={() => { pointerX = null; }} />
    <div ref={element => { choices = element; }} class="prediction-choices" hidden aria-label="Demo prediction choices">
      <button class="prediction-yes" aria-label="Preview Yes" aria-pressed="false" onClick={selectPreview}>[ YES ]</button>
      <button class="prediction-no" aria-label="Preview No" aria-pressed="false" onClick={selectPreview}>[ NO ]</button>
    </div>
    <span class="sr-only">Coming soon. A looping ASCII animation reveals a probability history chart with Yes and No demo choices. No money is wagered.</span>
  </main>;
}
