import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

type Job = {
  slug: "san-diego" | "san-jose";
  file: string;
  refs: string[];
  prompt: string;
};

const SRC_DIR = join(process.cwd(), "public", "images", "locations");
const OUT_DIR = join(SRC_DIR, "enhanced");
const MODEL = process.env.IMAGE_MODEL ?? "gemini-2.5-flash-image";

const STYLE =
  "Photorealistic editorial commercial real-estate and warehouse photography. Natural California daylight, clean contrast, accurate perspective, realistic shadows, high texture detail, crisp but not oversharpened. Keep the scene believable and grounded, not CGI, not a stock-photo warehouse. No text overlays, no watermarks, no invented brands.";

const JOBS: Job[] = [
  {
    slug: "san-diego",
    file: "san-diego-hero.jpeg",
    refs: [
      "san-diego-1.jpeg",
      "san-diego-2.jpeg",
      "san-diego-3.jpeg",
    ],
    prompt:
      "Create a polished hero-quality photo of the actual L&C San Diego warehouse location using the provided reference photos as source material. Show a clean, organized warehouse interior with tall pallet racking, stocked cases, polished concrete, and an operational food-distribution feel. Preserve the real warehouse character from the references while improving lighting, color, clarity, perspective, and composition for a professional website location card. Avoid plastic-looking surfaces, fantasy architecture, warped racks, extra signage, fake logos, or impossible aisle geometry.",
  },
  {
    slug: "san-jose",
    file: "san-jose-hero.jpeg",
    refs: [
      "san-jose-1.jpeg",
      "san-jose-2.jpeg",
      "san-jose-3.jpeg",
    ],
    prompt:
      "Create a polished hero-quality photo of the actual L&C San Jose warehouse location using the provided reference photos as source material. Feature the gray warehouse exterior, loading area, white L&C refrigerated truck, and green L&C signage when visible. Preserve the real building layout, truck proportions, green L&C branding, and California industrial setting while improving lighting, color, clarity, perspective, and composition for a professional website location card. Avoid invented signage, warped lettering, fake phone numbers, unrealistic clouds, stock-photo gloss, or CGI-looking surfaces.",
  },
];

async function loadRef(filename: string) {
  const buf = await readFile(join(SRC_DIR, filename));
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
  const jobs = only ? JOBS.filter((job) => job.slug === only) : JOBS;
  if (only && jobs.length === 0) {
    throw new Error(`No job named "${only}". Available: ${JOBS.map((job) => job.slug).join(", ")}`);
  }

  console.log(`Retouching ${jobs.length} location image(s) with ${MODEL}...\n`);

  for (const job of jobs) {
    const t0 = Date.now();
    process.stdout.write(`[${job.slug}] generating ${job.file}... `);

    const refs = await Promise.all(job.refs.map(loadRef));
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [...refs, { text: `${job.prompt}\n\n${STYLE}` }],
        },
      ],
      config: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio: "16:9" },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const imgPart = parts.find((part) => part.inlineData?.data);
    if (!imgPart?.inlineData?.data) {
      const textPart = parts.find((part) => part.text)?.text;
      throw new Error(`[${job.slug}] no image returned. Text response: ${textPart ?? "(none)"}`);
    }

    const buf = Buffer.from(imgPart.inlineData.data, "base64");
    const outPath = join(OUT_DIR, job.file);
    await sharp(buf)
      .resize({ width: 1600, height: 900, fit: "cover" })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(outPath);

    console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s -> ${outPath}`);
  }
}

main().catch((err) => {
  console.error("\nFAILED:", err?.message ?? err);
  process.exit(1);
});
