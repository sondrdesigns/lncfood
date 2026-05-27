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
    prompt: "Editorial overhead flat-lay of raw, unpackaged Asian dry pantry staples on a dark weathered wood surface — the PRODUCTS themselves, not packaging. Loose mounds and small piles of: long-grain jasmine rice, short-grain white rice, glutinous black rice, dried thin rice vermicelli noodles, dried wheat noodles bound in neat bundles, dried shiitake mushrooms, whole star anise, dried red chilies, sesame seeds, mung beans, dried wood-ear mushrooms, dried scallops or dried shrimp, and a small ceramic dish of soy beans. Some staples spill loosely onto the wood, others sit in plain rough-hewn wooden bowls or unglazed stoneware dishes with no markings. Natural side-lit daylight with soft shadows, rich textures, every grain and seed crisp and tactile. No bags, no sacks, no bottles, no jars with labels, no cans, no boxes, no plastic wrap, no shrink-wrap, no twist-ties, no printed text or characters of any kind anywhere in frame. Composition should feel like a market merchant's display of raw ingredients, not a packaged-goods shelf.",
  },
  {
    file: "cat-disposables",
    aspectRatio: "3:2",
    prompt: "Editorial overhead flat-lay of bare restaurant disposable goods — the ITEMS themselves laid out on a clean light wood or matte concrete surface, not their cardboard cases. A fan of natural-color wooden disposable chopsticks bundled by a paper sleeve and a few loose pairs beside it, a row of plain white plastic forks and spoons fanned out, a stack of brown kraft paper napkins folded neatly, a kraft-paper takeout clamshell box open and empty, a plain white paper soup cup with a translucent dome lid set next to it, a small stack of black plastic sushi trays with clear lids, a bundle of paper-wrapped plastic straws, and a brown paper takeout bag laid flat. Real materials, no logos, no printed text, no brand markings, no character text of any kind on any surface. Natural daylight, soft shadows, clean editorial composition, the props arranged with intentional negative space. Avoid cardboard case-pack cartons, plastic shrink wrap, warehouse shelving, barcodes, and styrofoam.",
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
    prompt: "Editorial overhead/three-quarter shot of an Asian beverage spread on a clean light wood surface. Two or three tall clear glasses of boba milk tea — visible dark tapioca pearls settled at the bottom, milky tan tea above, paper-wrapped wide straws set beside each glass with a few loose pearls scattered nearby. Alongside them: clear glass bottles of fruity sodas (lychee, peach, calamansi-style) with simple unbranded bottle silhouettes — pry-off crown caps, no labels or with labels turned out of focus so no text is readable — and a tall clear pitcher of iced jasmine or oolong tea with condensation, plus a smaller glass of chrysanthemum or barley tea. Soft natural daylight, subtle shadows, premium editorial color grading. Absolutely no aluminum cans of any kind, no canned drinks, no fountain cups, no plastic bottles, no readable brand text, no logos, no Asian-character typography. The composition should read as authentic café-style Asian beverages, not generic packaged drinks.",
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
