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
function grid(cols = COLS) { return Array.from({ length: ROWS }, () => Array<string>(cols).fill(' ')); }
function write(g: string[][], x: number, y: number, text: string) {
  Array.from(text).forEach((c, i) => { if (g[y] && x + i >= 0 && x + i < g[y]!.length) g[y][x + i] = c; });
}
export function comingFrame(time = 0, reducedMotion = false, cols = COLS) {
  const g = grid(cols);
  const compact = cols < 80;
  const lines = compact ? ['COMING', 'SOON'] : ['COMING SOON'];
  let dotX = 0;
  let dotY = 20;
  lines.forEach((text, index) => {
    const width = text.length * 6 - 1 + (index === lines.length - 1 ? 12 : 0);
    const left = Math.floor((cols - width) / 2);
    const top = compact ? 13 + index * 8 : 17;
    Array.from(text).forEach((letter, i) => glyphs[letter]?.forEach((line, y) => write(g, left + i * 6, top + y, line.replaceAll('#', '█'))));
    if (index === lines.length - 1) { dotX = left + text.length * 6; dotY = top + 3; }
  });
  const phase = time % 2700;
  const count = reducedMotion ? 1 : 1 + Math.floor(phase / 900);
  for (let i = 0; i < 3; i++) {
    const age = phase % 900;
    const changing = (count === 1 && i > 0) || (i === count - 1 && i > 0);
    for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
      const visible = i < count;
      const corrupt = !reducedMotion && changing && age < 240;
      write(g, dotX + i * 4 + x, dotY + y, corrupt ? noise[Math.floor(Math.random() * noise.length)]! : visible ? '█' : ' ');
    }
  }
  return g.map(row => row.join('')).join('\n');
}
const noise = '░▒▓/\\|<>_+*#01{}[]:;';
export function loopPhase(time: number) {
  // Each half: 5s quiet, 2s scattered buildup, 0.8s full interference,
  // then 2s clearing. Change the scene beneath the full-strength noise.
  const elapsed = ((time % 19600) + 19600) % 19600;
  const local = elapsed % 9800;
  const smooth = (value: number) => value * value * (3 - 2 * value);
  let intensity = 0;
  if (local >= 5000 && local < 7000) intensity = smooth((local - 5000) / 2000);
  else if (local >= 7000 && local < 7800) intensity = 1;
  else if (local >= 7800) intensity = 1 - smooth((local - 7800) / 2000);
  return {
    market: elapsed >= 7400 && elapsed < 17200,
    transition: local >= 5000,
    intensity,
  };
}

// A full field of interference, spread over every row and column.
export function interferenceFrame(cols = COLS, random = Math.random, density = .48) {
  return grid(cols).map(row => row.map(() => random() < density ? noise[Math.floor(random() * noise.length)]! : ' ').join('')).join('\n');
}

const probabilityHistory = [2,2,3,3,4,4,3,4,3,4,4,3,3,2,2,3,4,4,4,5,5,5,4,5,6,6,6,5,6,6,6,5,5,4,4,3,2,2,3,3,4,4,5,4,4,5,5,4,4,3,3,4,4,4,5,5,5,5];
export function chartPoints(cols = COLS) {
  const width = cols < 80 ? cols - 14 : 58;
  return Array.from({ length: width }, (_, x) => probabilityHistory[Math.round(x / (width - 1) * (probabilityHistory.length - 1))]!);
}
export function chartValue(position: number, cols = COLS) {
  const points = chartPoints(cols);
  const index = Math.round(Math.max(0, Math.min(1, position)) * (points.length - 1));
  const row = points[index]!;
  return { index, row: 16 + row, probability: 50 - (row - 2) * 5 };
}

export function marketFrame(time = 0, cols = COLS) {
  const g = grid(cols);
  const compact = cols < 80;
  const left = compact ? 3 : 17, right = compact ? cols - 4 : 82, top = 12, bottom = 28;
  write(g, left, top, '+' + '-'.repeat(right - left - 1) + '+');
  write(g, left, bottom, '+' + '-'.repeat(right - left - 1) + '+');
  for (let y = top + 1; y < bottom; y++) { write(g, left, y, '|'); write(g, right, y, '|'); }
  write(g, left + 4, top + 2, `PROBABILITY: ${chartValue(1, cols).probability}%`);
  const sampled = chartPoints(cols);
  const chartWidth = sampled.length;
  for (let x = 0; x < sampled.length; x++) {
    const y = sampled[x]!;
    const next = sampled[x + 1] ?? y;
    write(g, left + 4 + x, top + 4 + y, next > y ? '\\' : next < y ? '/' : '_');
  }
  write(g, right - 3, top + 9, Math.floor(time / 800) % 2 ? '*' : 'o');
  write(g, left + 4, bottom - 4, '+' + '-'.repeat(chartWidth - 1));
  write(g, left + 4, bottom - 2, '1H' + ' '.repeat(chartWidth - 5) + 'NOW');
  return g.map(row => row.join('')).join('\n');
}
export function scanFrame(source: string, time: number, strength = .12) {
  const rows = source.split('\n');
  const cols = rows[0]!.length;
  const sweep = Math.floor(time / 55) % ROWS;
  return rows.map((row, y) => {
    const active = y === sweep || (y + Math.floor(time / 130)) % 32 === 0;
    if (!active) return row;
    const chars = Array.from(row);
    const shift = Math.floor(Math.sin(time / 80 + y) * 4);
    return chars.map((_, x) => {
      if (Math.random() < strength) return noise[Math.floor(Math.random() * noise.length)];
      return chars[(x + shift + cols) % cols];
    }).join('');
  }).join('\n');
}
