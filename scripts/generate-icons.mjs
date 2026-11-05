/**
 * Generates icons/icon-192.png and icons/icon-512.png from a geometric
 * bento-box design, without any image library dependency.
 *
 * Usage: node scripts/generate-icons.mjs
 */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- PNG encoding ---------- */
const CRC_TABLE = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});

function crc32(buf) {
  let c = -1;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(width, height, rgba) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0; // filter: none
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- Drawing (512x512 design space, supersampled) ---------- */
const ORANGE = [255, 159, 67, 255];
const WHITE = [255, 255, 255, 255];
const TRANSPARENT = [0, 0, 0, 0];

function inRRect(px, py, x, y, w, h, r) {
  const qx = Math.abs(px - (x + w / 2)) - (w / 2 - r);
  const qy = Math.abs(py - (y + h / 2)) - (h / 2 - r);
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - r <= 0;
}

function inCircle(px, py, cx, cy, r) {
  return (px - cx) ** 2 + (py - cy) ** 2 <= r * r;
}

// Bottom-to-top stack: the topmost shape containing the point wins.
const layers = [
  { color: ORANGE, hit: (x, y) => inRRect(x, y, 300, 200, 88, 36, 18) },
  { color: ORANGE, hit: (x, y) => inCircle(x, y, 176, 218, 34) },
  { color: ORANGE, hit: (x, y) => inRRect(x, y, 96, 300, 320, 12, 6) },
  { color: ORANGE, hit: (x, y) => inRRect(x, y, 256, 136, 12, 240, 6) },
  { color: WHITE, hit: (x, y) => inRRect(x, y, 96, 136, 320, 240, 36) },
  { color: ORANGE, hit: (x, y) => inRRect(x, y, 0, 0, 512, 512, 112) },
];

function sample(x, y) {
  for (const layer of layers) {
    if (layer.hit(x, y)) return layer.color;
  }
  return TRANSPARENT;
}

function render(size) {
  const SUB = 3; // 3x3 supersampling per pixel
  const rgba = Buffer.alloc(size * size * 4);
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let sy = 0; sy < SUB; sy++) {
        for (let sx = 0; sx < SUB; sx++) {
          const dx = ((px + (sx + 0.5) / SUB) / size) * 512;
          const dy = ((py + (sy + 0.5) / SUB) / size) * 512;
          const [cr, cg, cb, ca] = sample(dx, dy);
          r += cr;
          g += cg;
          b += cb;
          a += ca;
        }
      }
      const n = SUB * SUB;
      const offset = (py * size + px) * 4;
      rgba[offset] = Math.round(r / n);
      rgba[offset + 1] = Math.round(g / n);
      rgba[offset + 2] = Math.round(b / n);
      rgba[offset + 3] = Math.round(a / n);
    }
  }
  return rgba;
}

mkdirSync(join(root, "icons"), { recursive: true });
for (const size of [192, 512]) {
  const png = encodePng(size, size, render(size));
  const out = join(root, "icons", `icon-${size}.png`);
  writeFileSync(out, png);
  console.log(`wrote ${out} (${png.length} bytes)`);
}
