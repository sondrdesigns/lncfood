import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const STYLE = "Clean modern editorial commercial photography. Natural daylight, soft cinematic color grading with subtle warm undertones, shallow depth of field, neutral palette with a hint of forest green to align with brand. Premium, calm, contemporary. No text, no logos, no watermarks, no people facing camera unless specified.";

type Job = {
  file: string;
  aspectRatio: "16:9" | "4:3" | "3:2";
  prompt: string;
};

const JOBS: Job[] = [
  {
    file: "home-hero",
    aspectRatio: "16:9",
    prompt: "Wide interior of a modern food distribution warehouse, tall steel racking stacked with neatly palletized cardboard boxes, polished concrete floor, a single forklift in soft focus mid-frame, tall glass loading-bay doors letting in golden afternoon light. Asian-American specialty distributor aesthetic, well-organized, prosperous.",
  },
  {
    file: "about-hero",
    aspectRatio: "16:9",
    prompt: "Warehouse loading area at dawn with a refrigerated delivery truck backed into a dock, fresh produce crates being moved on a pallet jack in the foreground, soft mist, sense of early-morning operations.",
  },
  {
    file: "careers-hero",
    aspectRatio: "16:9",
    prompt: "Two warehouse workers in branded forest-green polos and high-vis vests standing in a bright, organized warehouse aisle, scanning inventory on a tablet, shot from behind/three-quarter so faces are not the focus. Sense of teamwork and pride.",
  },
  {
    file: "products-hero",
    aspectRatio: "16:9",
    prompt: "Overhead flat-lay of an abundant wholesale produce arrangement: bok choy, daikon, ginger, shiitake mushrooms, scallions, Thai chilies, fresh herbs on a weathered wooden surface. Editorial food-photography lighting.",
  },
  {
    file: "application-hero",
    aspectRatio: "16:9",
    prompt: "Professional Asian restaurant kitchen mid-service, stainless steel surfaces, a wok flaming over a high-output burner, hands of a chef plating in soft focus background, steam catching the light.",
  },
  {
    file: "home-about-section",
    aspectRatio: "4:3",
    prompt: "Inside a clean warehouse: rows of organized inventory shelving with cardboard cases of Asian groceries (rice bags, sauce cases, noodle boxes) stretching into soft-focus background, one warehouse worker in branded polo checking a clipboard in mid-ground.",
  },
  {
    file: "about-story-section",
    aspectRatio: "4:3",
    prompt: "Side profile of a clean white refrigerated delivery truck parked at a sunny California loading dock with palm trees softly in the background, professional commercial vehicle photography.",
  },
  {
    file: "home-cta-bg",
    aspectRatio: "16:9",
    prompt: "Close-up action shot of a chef's hands tossing stir-fry in a wok over a flame, motion blur on the food, warm orange and amber tones, composition that allows a heavy green gradient overlay to read clearly.",
  },
  {
    file: "cat-fruits-vegetables",
    aspectRatio: "3:2",
    prompt: "Vibrant arrangement of Asian and Western produce - bok choy, napa cabbage, bell peppers, broccoli, carrots, onions, oyster mushrooms - staged on a dark wood market display, soft daylight, top-down three-quarter angle.",
  },
  {
    file: "cat-meat-seafood",
    aspectRatio: "3:2",
    prompt: "Premium butcher-counter style flat-lay: cuts of raw beef, pork loin, whole chicken, alongside fresh shrimp on ice and a whole fish, on a slate surface with sprigs of herbs. Clean, refined, no blood or distress.",
  },
  {
    file: "cat-dry-grocery",
    aspectRatio: "3:2",
    prompt: "Shelf-style arrangement of pantry staples: a large rice bag, bottles of soy sauce and sesame oil, jars of chili crisp, dried noodles in clear packaging, canned bamboo shoots. Warm, organized, premium.",
  },
  {
    file: "cat-disposables",
    aspectRatio: "3:2",
    prompt: "Stack of clean kraft and white to-go food containers, takeout boxes, paper cups with lids, wooden chopsticks and paper napkins, arranged neatly on a light surface. Modern packaging, sustainable feel.",
  },
  {
    file: "cat-beverages",
    aspectRatio: "3:2",
    prompt: "Selection of food-service beverages: glass bottles of soda, canned drinks, a tall glass of milk tea with boba, syrup bottles, on a clean light wood surface with subtle shadows.",
  },
];

const OUT_DIR = join(process.cwd(), "public", "images");
const MODEL = "gemini-3-pro-image-preview";

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing from .env");
  }

  await mkdir(OUT_DIR, { recursive: true });

  const ai = new GoogleGenAI({ apiKey });

  const only = process.argv[2];
  const jobs = only ? JOBS.filter((j) => j.file === only) : JOBS;
  if (only && jobs.length === 0) {
    throw new Error(`No job named "${only}". Available: ${JOBS.map((j) => j.file).join(", ")}`);
  }

  console.log(`Generating ${jobs.length} image(s) with ${MODEL}...\n`);

  for (const job of jobs) {
    const fullPrompt = `${job.prompt}\n\n${STYLE}`;
    const t0 = Date.now();
    process.stdout.write(`[${job.file}] (${job.aspectRatio}) generating... `);

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
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
