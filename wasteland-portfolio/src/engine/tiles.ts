// Procedural pixel-art tile renderer — high-res Underrail-style
// Generates tile textures at 128x64 using Canvas 2D (used for ground texture in 3D scene)

const TILE_W = 128;
const TILE_H = 64;

export type TileType =
  | 'ground'
  | 'ground_dead_grass'
  | 'ground_scorched'
  | 'road_ns'
  | 'road_ew'
  | 'road_cross'
  | 'rubble'
  | 'rubble2'
  | 'puddle'
  | 'void_edge'
  | 'void_edge_crumble';

// Muted post-apocalyptic palette
const PAL = {
  dirt: '#6B5B4F',
  dirtDark: '#5A4A3E',
  dirtMid: '#635347',
  dirtLight: '#7D6D5F',
  dirtPale: '#8A7A6C',
  asphalt: '#3A3A3E',
  asphaltMid: '#333338',
  asphaltCrack: '#2A2A2E',
  asphaltLine: '#5A5A40',
  asphaltPatch: '#424248',
  grass: '#4A5A3A',
  grassDark: '#3A4A2A',
  grassDead: '#5A5840',
  grassBrown: '#4E4830',
  scorched: '#2E2A26',
  scorchedDark: '#1E1A16',
  scorchedMid: '#3E3630',
  rubble: '#5A5550',
  rubbleLight: '#6A6560',
  rubbleDark: '#4A4540',
  concrete: '#7A7570',
  concreteDark: '#6A6560',
  puddle: '#3A5A5A',
  puddleDeep: '#2A4A4A',
  puddleGlow: '#4A6A5A',
  puddleEdge: '#4A5A50',
  gridLine: 'rgba(255,255,255,0.05)',
};

function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function isInsideDiamond(px: number, py: number, x: number, y: number, w: number, h: number): boolean {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const dx = Math.abs(px - cx) / (w / 2);
  const dy = Math.abs(py - cy) / (h / 2);
  return dx + dy <= 1;
}

function drawIsoDiamond(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y);
  ctx.lineTo(x + w, y + h / 2);
  ctx.lineTo(x + w / 2, y + h);
  ctx.lineTo(x, y + h / 2);
  ctx.closePath();
  ctx.fill();
}

function drawGridOutline(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.strokeStyle = PAL.gridLine;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y);
  ctx.lineTo(x + w, y + h / 2);
  ctx.lineTo(x + w / 2, y + h);
  ctx.lineTo(x, y + h / 2);
  ctx.closePath();
  ctx.stroke();
}

/** Scatter pixels inside the diamond with rejection sampling */
function scatter(
  ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number,
  color: string, count: number, pixSize: number, rand: () => number
) {
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    for (let attempt = 0; attempt < 6; attempt++) {
      const px = x + rand() * w;
      const py = y + rand() * h;
      if (isInsideDiamond(px, py, x, y, w, h)) {
        ctx.fillRect(Math.floor(px), Math.floor(py), pixSize, pixSize);
        break;
      }
    }
  }
}

/** Draw a crack line (for roads and concrete) */
function drawCrack(ctx: CanvasRenderingContext2D, sx: number, sy: number, len: number, angle: number, color: string, rand: () => number) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  let cx = sx, cy = sy;
  const segments = 3 + Math.floor(rand() * 4);
  for (let i = 0; i < segments; i++) {
    const a = angle + (rand() - 0.5) * 1.2;
    const segLen = len / segments;
    cx += Math.cos(a) * segLen;
    cy += Math.sin(a) * segLen;
    ctx.lineTo(Math.floor(cx), Math.floor(cy));
  }
  ctx.stroke();
}

const tileCache = new Map<string, HTMLCanvasElement>();

export function generateTile(type: TileType, variant: number = 0): HTMLCanvasElement {
  const key = `${type}_${variant}`;
  if (tileCache.has(key)) return tileCache.get(key)!;

  const canvas = document.createElement('canvas');
  canvas.width = TILE_W;
  canvas.height = TILE_H;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  const rand = seededRand(variant * 1000 + type.charCodeAt(0) * 31);

  switch (type) {
    case 'ground': {
      drawIsoDiamond(ctx, 0, 0, TILE_W, TILE_H, PAL.dirt);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.dirtDark, 40, 2, rand);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.dirtLight, 20, 2, rand);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.dirtMid, 25, 1, rand);
      // Small pebbles
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.dirtPale, 8, 3, rand);
      break;
    }
    case 'ground_dead_grass': {
      drawIsoDiamond(ctx, 0, 0, TILE_W, TILE_H, PAL.dirt);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.dirtDark, 20, 2, rand);
      // Grass tufts (short vertical lines)
      for (let i = 0; i < 20; i++) {
        const gx = TILE_W * 0.15 + rand() * TILE_W * 0.7;
        const gy = TILE_H * 0.15 + rand() * TILE_H * 0.7;
        if (!isInsideDiamond(gx, gy, 0, 0, TILE_W, TILE_H)) continue;
        const col = rand() > 0.5 ? PAL.grass : (rand() > 0.5 ? PAL.grassDead : PAL.grassBrown);
        ctx.fillStyle = col;
        ctx.fillRect(Math.floor(gx), Math.floor(gy) - 3, 1, 4);
        ctx.fillRect(Math.floor(gx) + 1, Math.floor(gy) - 2, 1, 3);
      }
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.grassDark, 15, 1, rand);
      break;
    }
    case 'ground_scorched': {
      drawIsoDiamond(ctx, 0, 0, TILE_W, TILE_H, PAL.scorched);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.scorchedDark, 45, 2, rand);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.scorchedMid, 20, 2, rand);
      // Char marks
      for (let i = 0; i < 3; i++) {
        const cx = TILE_W * 0.2 + rand() * TILE_W * 0.6;
        const cy = TILE_H * 0.2 + rand() * TILE_H * 0.6;
        if (isInsideDiamond(cx, cy, 0, 0, TILE_W, TILE_H)) {
          drawCrack(ctx, cx, cy, 12 + rand() * 10, rand() * Math.PI * 2, '#1A1610', rand);
        }
      }
      break;
    }
    case 'road_ns':
    case 'road_ew':
    case 'road_cross': {
      drawIsoDiamond(ctx, 0, 0, TILE_W, TILE_H, PAL.asphalt);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.asphaltMid, 30, 2, rand);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.asphaltCrack, 20, 1, rand);
      // Repair patches
      for (let i = 0; i < 2; i++) {
        const px = TILE_W * 0.2 + rand() * TILE_W * 0.6;
        const py = TILE_H * 0.2 + rand() * TILE_H * 0.6;
        if (isInsideDiamond(px, py, 0, 0, TILE_W, TILE_H)) {
          ctx.fillStyle = PAL.asphaltPatch;
          ctx.fillRect(Math.floor(px), Math.floor(py), 6 + Math.floor(rand() * 8), 4 + Math.floor(rand() * 4));
        }
      }
      // Cracks
      for (let i = 0; i < 3; i++) {
        const cx = TILE_W * 0.15 + rand() * TILE_W * 0.7;
        const cy = TILE_H * 0.15 + rand() * TILE_H * 0.7;
        if (isInsideDiamond(cx, cy, 0, 0, TILE_W, TILE_H)) {
          drawCrack(ctx, cx, cy, 15 + rand() * 20, rand() * Math.PI * 2, PAL.asphaltCrack, rand);
        }
      }
      // Lane markings
      if (type === 'road_ns' || type === 'road_cross') {
        ctx.fillStyle = PAL.asphaltLine;
        for (let i = 0; i < 6; i++) {
          const t = (i + 0.3) / 6;
          const px = TILE_W / 2 + (t - 0.5) * 8;
          const py = TILE_H * t;
          if (isInsideDiamond(px, py, 0, 0, TILE_W, TILE_H)) {
            ctx.fillRect(Math.floor(px) - 1, Math.floor(py), 3, 3);
          }
        }
      }
      if (type === 'road_ew' || type === 'road_cross') {
        ctx.fillStyle = PAL.asphaltLine;
        for (let i = 0; i < 6; i++) {
          const t = (i + 0.3) / 6;
          const px = TILE_W * t;
          const py = TILE_H / 2 + (t - 0.5) * 8;
          if (isInsideDiamond(px, py, 0, 0, TILE_W, TILE_H)) {
            ctx.fillRect(Math.floor(px), Math.floor(py) - 1, 3, 3);
          }
        }
      }
      break;
    }
    case 'rubble': {
      drawIsoDiamond(ctx, 0, 0, TILE_W, TILE_H, PAL.rubble);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.rubbleLight, 25, 2, rand);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.rubbleDark, 20, 2, rand);
      // Concrete blocks
      for (let i = 0; i < 5; i++) {
        const bx = TILE_W * 0.15 + rand() * TILE_W * 0.7;
        const by = TILE_H * 0.15 + rand() * TILE_H * 0.7;
        if (isInsideDiamond(bx, by, 0, 0, TILE_W, TILE_H)) {
          const bw = 4 + Math.floor(rand() * 8);
          const bh = 3 + Math.floor(rand() * 5);
          ctx.fillStyle = rand() > 0.5 ? PAL.concrete : PAL.concreteDark;
          ctx.fillRect(Math.floor(bx), Math.floor(by), bw, bh);
          // Rebar poking out
          if (rand() > 0.6) {
            ctx.fillStyle = '#6A4A3A';
            ctx.fillRect(Math.floor(bx) + bw - 1, Math.floor(by) - 2, 1, 4);
          }
        }
      }
      break;
    }
    case 'rubble2': {
      drawIsoDiamond(ctx, 0, 0, TILE_W, TILE_H, PAL.dirtDark);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.rubble, 35, 2, rand);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.rubbleDark, 20, 3, rand);
      // Larger debris chunks
      for (let i = 0; i < 7; i++) {
        const bx = TILE_W * 0.1 + rand() * TILE_W * 0.8;
        const by = TILE_H * 0.1 + rand() * TILE_H * 0.8;
        if (isInsideDiamond(bx, by, 0, 0, TILE_W, TILE_H)) {
          ctx.fillStyle = PAL.rubbleLight;
          ctx.fillRect(Math.floor(bx), Math.floor(by), 3 + Math.floor(rand() * 6), 2 + Math.floor(rand() * 3));
        }
      }
      break;
    }
    case 'puddle': {
      drawIsoDiamond(ctx, 0, 0, TILE_W, TILE_H, PAL.dirt);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.dirtDark, 15, 2, rand);
      // Puddle — irregular smaller diamond
      const inset = 20;
      drawIsoDiamond(ctx, inset, inset / 2, TILE_W - inset * 2, TILE_H - inset, PAL.puddleDeep);
      scatter(ctx, inset, inset / 2, TILE_W - inset * 2, TILE_H - inset, PAL.puddle, 15, 2, rand);
      scatter(ctx, inset, inset / 2, TILE_W - inset * 2, TILE_H - inset, PAL.puddleGlow, 8, 1, rand);
      // Edge sediment
      scatter(ctx, inset - 4, inset / 2 - 2, TILE_W - inset * 2 + 8, TILE_H - inset + 4, PAL.puddleEdge, 12, 1, rand);
      break;
    }
    case 'void_edge': {
      drawIsoDiamond(ctx, 0, 0, TILE_W, TILE_H, '#1A1816');
      scatter(ctx, 0, 0, TILE_W, TILE_H, '#0A0806', 50, 2, rand);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.dirtDark, 10, 2, rand);
      // Crumbling texture
      for (let i = 0; i < 4; i++) {
        const cx = TILE_W * 0.1 + rand() * TILE_W * 0.8;
        const cy = TILE_H * 0.1 + rand() * TILE_H * 0.8;
        if (isInsideDiamond(cx, cy, 0, 0, TILE_W, TILE_H)) {
          drawCrack(ctx, cx, cy, 8 + rand() * 12, rand() * Math.PI * 2, '#0A0806', rand);
        }
      }
      break;
    }
    case 'void_edge_crumble': {
      drawIsoDiamond(ctx, 0, 0, TILE_W, TILE_H, '#000000');
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(TILE_W / 2, 0);
      ctx.lineTo(TILE_W * 0.75, TILE_H * 0.3);
      ctx.lineTo(TILE_W * 0.65, TILE_H * 0.45);
      ctx.lineTo(TILE_W * 0.5, TILE_H * 0.55);
      ctx.lineTo(TILE_W * 0.3, TILE_H * 0.65);
      ctx.lineTo(0, TILE_H / 2);
      ctx.closePath();
      ctx.clip();
      drawIsoDiamond(ctx, 0, 0, TILE_W, TILE_H, '#1A1816');
      scatter(ctx, 0, 0, TILE_W, TILE_H, '#0A0806', 30, 2, rand);
      scatter(ctx, 0, 0, TILE_W, TILE_H, PAL.dirtDark, 8, 2, rand);
      ctx.restore();
      break;
    }
  }

  drawGridOutline(ctx, 0, 0, TILE_W, TILE_H);
  tileCache.set(key, canvas);
  return canvas;
}
