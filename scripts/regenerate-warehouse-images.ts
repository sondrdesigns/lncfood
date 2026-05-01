import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const STYLE = "Clean modern editorial commercial photography. Natural daylight where possible, soft cinematic color grading with subtle warm undertones, shallow depth of field, neutral palette with a hint of forest green to align with brand. Premium, calm, contemporary. No text overlays, no watermarks. Preserve any visible 'L&C' or '陈氏食品公司' green logo branding accurately when it appears in the reference. Keep the wood-beam ceiling, blue/orange pallet racking, polished concrete floor, and overall character of the actual warehouse from the reference photos.";

const REF_GUIDANCE = "Reference photos of the client's actual San Jose warehouse are provided as input images. Use them as the source of truth for: building layout, racking color and arrangement, ceiling structure (exposed wood beams + fluorescent strip lights), forklift make/color (orange Toyota), truck branding, and the storefront's green L&C signage. Produce a polished, editorial commercial photograph that clearly depicts THIS warehouse, not a generic stock warehouse. Do not invent foreign branding, logos, or signage that contradicts the references.";

type Job = {
  file: string;
  aspectRatio: "16:9" | "4:3" | "3:2";
  refs: string[];
  prompt: string;
};

const REFS_DIR = join(process.cwd(), "scripts", "refs", "warehouse");

const JOBS: Job[] = [
  {
    file: "home-hero",
    aspectRatio: "16:9",
    refs: ["interior-forklift.jpeg", "interior-aisle-wide.jpeg"],
    prompt:
      "Wide interior of the L&C food distribution warehouse: tall blue steel pallet racking stacked with neatly palletized cardboard cases, polished concrete floor, an orange Toyota forklift in soft focus mid-frame, exposed wood-beam ceiling with fluorescent strip lighting overhead. Composition should read as a confident hero image - tidy, well-stocked, and active without being chaotic. Keep the warehouse's signature wood ceiling and blue racking from the references.",
  },
  {
    file: "about-hero",
    aspectRatio: "16:9",
    refs: ["exterior-storefront.jpeg", "truck-at-dock.jpeg"],
    prompt:
      "Exterior loading area of the L&C warehouse in early-morning light: the white refrigerated L&C box truck (with its real green '陈氏食品公司' / 'L&C' branding and (888) 988-8816 phone visible in the references) backed into the open roll-up loading dock, gray warehouse facade with the green L&C sign above the door, a few wooden pallets staged at the curb. Soft warm dawn light, clean blue California sky, sense of operations starting up. Preserve the truck branding accurately.",
  },
  {
    file: "careers-hero",
    aspectRatio: "16:9",
    refs: ["interior-aisle-wide.jpeg", "interior-aisle-stocked.jpeg"],
    prompt:
      "Two warehouse workers in branded forest-green polos and high-vis vests standing in a bright, organized aisle of the L&C warehouse, scanning inventory on a tablet. Shot from behind / three-quarter so faces are not the focus. The aisle should match the references: blue pallet racking on both sides fully stocked with cardboard cases, exposed wood-beam ceiling, polished concrete floor, fluorescent overhead lighting. Sense of teamwork and pride.",
  },
  {
    file: "home-about-section",
    aspectRatio: "4:3",
    refs: ["interior-aisle-beverages.jpeg", "interior-aisle-stocked.jpeg"],
    prompt:
      "Inside the L&C warehouse: rows of organized blue pallet racking stacked with cases of Asian groceries (rice bags, sauce cases, noodle boxes, bottled beverages) stretching into a soft-focus background. One warehouse worker in a branded forest-green polo checks a clipboard in mid-ground, three-quarter from behind. Wood-beam ceiling and concrete floor matching the references.",
  },
  {
    file: "about-story-section",
    aspectRatio: "4:3",
    refs: ["truck-at-dock.jpeg"],
    prompt:
      "Side profile of the white L&C refrigerated delivery box truck parked at the warehouse loading dock under a sunny California sky. The real green L&C / '陈氏食品公司' logo and (888) 988-8816 phone number on the truck side should be preserved accurately from the reference. Clean, professional commercial vehicle photography, slight three-quarter angle, gray warehouse facade behind.",
  },
];

const OUT_DIR = join(process.cwd(), "public", "images");
const MODEL = "gemini-3-pro-image-preview";

async function loadRef(filename: string) {
  const buf = await readFile(join(REFS_DIR, filename));
  return {
    inlineData: {
      mimeType: "image/jpeg",
      data: buf.toString("base64"),
    },
  };
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing from .env");
  }

  await mkdir(OUT_DIR, { recursive: true });

  const ai = new GoogleGenAI({ apiKey });

  const only = process.argv[2];
  const dryRun = process.argv.includes("--dry-run");
  const writeRaw = process.argv.includes("--write-raw");
  const jobs = only && !only.startsWith("--") ? JOBS.filter((j) => j.file === only) : JOBS;
  if (only && !only.startsWith("--") && jobs.length === 0) {
    throw new Error(
      `No job named "${only}". Available: ${JOBS.map((j) => j.file).join(", ")}`,
    );
  }

  console.log(`Regenerating ${jobs.length} warehouse image(s) with ${MODEL} using client references...\n`);

  for (const job of jobs) {
    const fullPrompt = `${job.prompt}\n\n${REF_GUIDANCE}\n\n${STYLE}`;
    const t0 = Date.now();
    process.stdout.write(`[${job.file}] (${job.aspectRatio}, refs: ${job.refs.join(", ")}) generating... `);

    if (dryRun) {
      console.log("(dry run, skipped)");
      continue;
    }

    const refParts = await Promise.all(job.refs.map(loadRef));

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [...refParts, { text: fullPrompt }],
        },
      ],
      config: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio: job.aspectRatio },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const imgPart = parts.find((p) => p.inlineData?.data);
    if (!imgPart?.inlineData?.data) {
      const textPart = parts.find((p) => p.text)?.text;
      throw new Error(`[${job.file}] no image returned. Text response: ${textPart ?? "(none)"}`);
    }

    const buf = Buffer.from(imgPart.inlineData.data, "base64");

    if (writeRaw) {
      const rawPath = join(OUT_DIR, `${job.file}.raw.png`);
      await writeFile(rawPath, buf);
    }

    const outPath = join(OUT_DIR, `${job.file}.webp`);
    await sharp(buf).webp({ quality: 85, effort: 5 }).toFile(outPath);

    const ms = Date.now() - t0;
    console.log(`done in ${(ms / 1000).toFixed(1)}s -> ${outPath}`);
  }

  console.log(`\nAll done. Output: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error("\nFAILED:", err?.message ?? err);
  process.exit(1);
});
