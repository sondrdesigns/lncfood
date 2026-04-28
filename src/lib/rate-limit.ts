import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let cached: Ratelimit | null = null;
let lookedUp = false;

function getLimiter(): Ratelimit | null {
  if (lookedUp) return cached;
  lookedUp = true;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  cached = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    prefix: "lnc:login",
    analytics: false,
  });
  return cached;
}

export async function applyLoginRateLimit(key: string): Promise<boolean> {
  const limiter = getLimiter();
  if (!limiter) return true;
  try {
    const { success } = await limiter.limit(key);
    return success;
  } catch (err) {
    console.error("Rate limiter error (allowing request):", err);
    return true;
  }
}
