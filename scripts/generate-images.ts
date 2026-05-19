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
    prompt: "Wide interior of a modern food distribution warehouse, completely open at the far end with no doors or entrance gates — the building is fully open to the outside world, framing a bright daylight view of the loading yard beyond. Tall steel racking stacked with neatly palletized cardboard boxes lines both sides, polished concrete floor, a single forklift in soft focus mid-frame. Golden afternoon light streams in unobstructed from the open end. Asian-American specialty distributor aesthetic, well-organized, prosperous. Do not depict roll-up doors, glass loading-bay doors, dock-leveler doors, or any entrance door whatsoever — the warehouse interior simply opens onto daylight.",
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
    // TODO: replace with client-specified product lineup once they share the
    // actual SKU list. For now, packaging is intentionally generic and
    // unbranded to avoid implying any specific brand affiliation.
    prompt: "Realistic warehouse aisle shelf-perspective of Asian dry goods with completely UNBRANDED, generic packaging — no readable text, no logos, no brand marks, no specific brand colors. Large neutral kraft-paper and plain canvas bags of rice stacked low (the bags show only abstract crease and weave texture, no label artwork). Tall amber and clear glass bottles with simple paper labels that are intentionally blurred / illegible. Plain off-white cylindrical jars and shrink-wrapped plastic bricks of dried noodles with blank wrappers. Stacked tin cans with monochrome unlabeled wrappers. Natural in-aisle warehouse lighting from overhead, slight shelf depth, real material textures. Wholesale distributor inventory feel, not studio styled. Absolutely no readable brand names, slogans, or recognizable logo shapes anywhere in frame.",
  },
  {
    file: "cat-disposables",
    aspectRatio: "3:2",
    prompt: "Photorealistic food-service distributor warehouse shelf photo of bulk restaurant disposables in their real case-pack context: stacks of sealed cardboard cartons, open cartons showing kraft takeout boxes, wrapped white soup cups and lids, bundled paper napkins, sleeve-packed chopsticks, clear deli lids, black sushi trays, and brown paper bags on industrial metal shelving. Show real packaging repetition, corrugated box edges, plastic wrap, scuffed shelf surfaces, barcode-label-like details without readable brand text, and natural warehouse overhead lighting. Composition should feel like an actual wholesale inventory aisle, not a styled tabletop still life. Avoid ceramic bowls, houseplant decor, sunlit home-kitchen windows, perfect studio props, floating objects, styrofoam, and CGI-looking packaging.",
  },
  {
    file: "about-built-for-scale",
    aspectRatio: "4:3",
    prompt: "Wide warehouse-floor perspective looking down a long aisle of tall blue pallet racking stacked four levels high with palletized cardboard cases — rice sacks on the lower shelves, sauce cases mid-level, beverage cases up top. An orange Toyota-style forklift with a stacked load is visible mid-aisle in soft focus. Polished concrete floor catching overhead light, exposed wood-beam ceiling with fluorescent strip lights. Sense of inventory depth, operational capacity, and quiet competence. Editorial commercial photography, not stocky.",
  },
  {
    file: "products-cant-find-bg",
    aspectRatio: "16:9",
    prompt: "Moody, low-contrast warehouse-aisle photo with plenty of negative space and intentional shadow on the upper half so a dark green gradient overlay can sit on top with readable white text. A chef or sourcing manager in soft three-quarter focus stands mid-aisle inspecting a specialty Asian ingredient — a dried shiitake mushroom or a glass jar of fermented bean paste — held up to a shaft of light from a tall warehouse window. Surrounding shelves of cardboard cases recede into shadowy depth. Cinematic, atmospheric, premium.",
  },
  {
    file: "cat-beverages",
    aspectRatio: "3:2",
    prompt: "Selection of food-service beverages: glass bottles of soda, canned drinks, a tall glass of milk tea with boba, syrup bottles, on a clean light wood surface with subtle shadows.",
  },
];

const OUT_DIR = join(process.cwd(), "public", "images");
const MODEL = process.env.IMAGE_MODEL ?? "gemini-2.5-flash-image";

const MAX_ATTEMPTS = 5;

async function generateWithRetry(
  ai: GoogleGenAI,
  params: Parameters<GoogleGenAI["models"]["generateContent"]>[0],
) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await ai.models.generateContent(params);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const transient = /\b(503|429|UNAVAILABLE|RESOURCE_EXHAUSTED|high demand)\b/i.test(msg);
      if (!transient || attempt === MAX_ATTEMPTS) throw err;
      const delayMs = Math.min(60_000, 2_000 * 2 ** (attempt - 1));
      process.stdout.write(`(transient ${attempt}/${MAX_ATTEMPTS}, retrying in ${delayMs / 1000}s) `);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error("unreachable");
}

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

    const response = await generateWithRetry(ai, {
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
