import sharp from "sharp";
import { readdir, mkdir, copyFile } from "node:fs/promises";
import { join } from "node:path";

// Non-generative quality pass for the real client warehouse photos.
// Reads originals from public/images/locations/, writes enhanced copies to
// public/images/locations/enhanced/ so originals are preserved for review.
// Tweaks: mild sharpen, slight tone curve, modest saturation boost. No AI.

const SRC_DIR = join(process.cwd(), "public", "images", "locations");
const OUT_DIR = join(SRC_DIR, "enhanced");

async function enhanceOne(file: string) {
  const inPath = join(SRC_DIR, file);
  const outPath = join(OUT_DIR, file);
  const t0 = Date.now();
  process.stdout.write(`[${file}] enhancing... `);

  await sharp(inPath)
    .modulate({ brightness: 1.03, saturation: 1.12 })
    .linear(1.05, -8)            // gentle contrast boost
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 2.5 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outPath);

  console.log(`done in ${(Date.now() - t0)}ms -> ${outPath}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const all = await readdir(SRC_DIR);
  const targets = all.filter((f) => /^(san-diego|san-jose)-\d+\.jpe?g$/i.test(f));
  if (targets.length === 0) {
    console.log("No location photos found.");
    return;
  }
  console.log(`Enhancing ${targets.length} location photo(s)...\n`);
  for (const f of targets) {
    await enhanceOne(f);
  }
  console.log(`\nDone. Review ${OUT_DIR}; if approved, copy over the originals.`);
}

main().catch((err) => {
  console.error("\nFAILED:", err?.message ?? err);
  process.exit(1);
});
