export const COLS = 100;
export const ROWS = 40;
const glyphs: Record<string, string[]> = {
  C: [' ####','##   ','##   ','##   ',' ####'],
  O: [' ### ','## ##','## ##','## ##',' ### '],
  M: ['#   #','## ##','# # #','#   #','#   #'],
  I: ['#####','  #  ','  #  ','  #  ','#####'],
  N: ['#   #','##  #','# # #','#  ##','#   #'],
  G: [' ####','##   ','## ##','##  #',' ####'],
  S: [' ####','##   ',' ### ','   ##','#### '],
};
function grid() { return Array.from({ length: ROWS }, () => Array<string>(COLS).fill(' ')); }
function write(g: string[][], x: number, y: number, text: string) {
  Array.from(text).forEach((c, i) => { if (g[y] && x + i >= 0 && x + i < COLS) g[y][x + i] = c; });
}
export function comingFrame(time = 0, reducedMotion = false) {
  const g = grid();
  const text = 'COMING SOON';
  const width = text.length * 6 - 1 + 12;
  Array.from(text).forEach((letter, i) => glyphs[letter]?.forEach((line, y) => write(g, Math.floor((COLS - width) / 2) + i * 6, 17 + y, line.replaceAll('#', '█'))));
  const phase = time % 2700;
  const count = reducedMotion ? 1 : 1 + Math.floor(phase / 900);
  const dotX = Math.floor((COLS - width) / 2) + text.length * 6;
  for (let i = 0; i < 3; i++) {
    const age = phase % 900;
    const changing = (count === 1 && i > 0) || (i === count - 1 && i > 0);
    for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
      const visible = i < count;
      const corrupt = !reducedMotion && changing && age < 240;
      write(g, dotX + i * 4 + x, 20 + y, corrupt ? noise[Math.floor(Math.random() * noise.length)]! : visible ? '█' : ' ');
    }
  }
  return g.map(row => row.join('')).join('\n');
}
const noise = '░▒▓/\\|<>_+*#01{}[]:;';
// A moving band, scattered corruption, and staggered character resolution.
export function glitchFrame(from: string, to: string, progress: number, random = Math.random) {
  const a = Array.from(from), b = Array.from(to);
  const intensity = Math.sin(progress * Math.PI);
  return a.map((c, i) => {
    if (c === '\n') return c;
    const x = i % (COLS + 1), y = Math.floor(i / (COLS + 1));
    const threshold = (x / COLS * .35 + y / ROWS * .65);
    const target = progress > threshold ? b[i] ?? ' ' : c;
    const band = Math.abs(y / ROWS - progress) < .09;
    if (random() < intensity * (band ? .7 : target !== ' ' ? .35 : .065)) return noise[Math.floor(random() * noise.length)];
    return target;
  }).join('');
}

export function marketFrame(time = 0) {
  const g = grid();
  const left = 17, right = 82, top = 12, bottom = 28;
  write(g, left, top, '+' + '-'.repeat(right - left - 1) + '+');
  write(g, left, bottom, '+' + '-'.repeat(right - left - 1) + '+');
  for (let y = top + 1; y < bottom; y++) { write(g, left, y, '|'); write(g, right, y, '|'); }
  write(g, left + 4, top + 2, 'PROBABILITY HISTORY');
  const points = [2,2,3,3,4,4,3,4,3,4,4,3,3,2,2,3,4,4,4,5,5,5,4,5,6,6,6,5,6,6,6,5,5,4,4,3,2,2,3,3,4,4,5,4,4,5,5,4,4,3,3,4,4,4,5,5,5,5];
  for (let x = 0; x < points.length; x++) {
    const y = points[x]!;
    const next = points[x + 1] ?? y;
    write(g, left + 4 + x, top + 4 + y, next > y ? '\\' : next < y ? '/' : '_');
  }
  write(g, right - 3, top + 9, Math.floor(time / 800) % 2 ? '*' : 'o');
  write(g, left + 4, bottom - 4, '+' + '-'.repeat(57));
  write(g, left + 4, bottom - 2, '1H' + ' '.repeat(52) + 'NOW');
  return g.map(row => row.join('')).join('\n');
}
export function scanFrame(source: string, time: number, strength = .12) {
  const rows = source.split('\n');
  const sweep = Math.floor(time / 55) % ROWS;
  return rows.map((row, y) => {
    const active = y === sweep || (y + Math.floor(time / 130)) % 32 === 0;
    if (!active) return row;
    const chars = Array.from(row);
    const shift = Math.floor(Math.sin(time / 80 + y) * 4);
    return chars.map((_, x) => {
      if (Math.random() < strength) return noise[Math.floor(Math.random() * noise.length)];
      return chars[(x + shift + COLS) % COLS];
    }).join('');
  }).join('\n');
}
