import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type LimiterCfg = { tokens: number; window: `${number} ${"s" | "m" | "h"}`; prefix: string };

const cache = new Map<string, Ratelimit>();
let redis: Redis | null = null;
let redisLookedUp = false;

function getRedis(): Redis | null {
  if (redisLookedUp) return redis;
  redisLookedUp = true;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
}

function getLimiter(cfg: LimiterCfg): Ratelimit | null {
  const r = getRedis();
  if (!r) return null;
  let limiter = cache.get(cfg.prefix);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: r,
      limiter: Ratelimit.slidingWindow(cfg.tokens, cfg.window),
      prefix: cfg.prefix,
      analytics: false,
    });
    cache.set(cfg.prefix, limiter);
  }
  return limiter;
}

async function check(cfg: LimiterCfg, key: string): Promise<boolean> {
  const limiter = getLimiter(cfg);
  if (!limiter) return true; // best-effort: allow if Upstash unconfigured
  try {
    const { success } = await limiter.limit(key);
    return success;
  } catch (err) {
    console.error("Rate limiter error (allowing request):", err);
    return true;
  }
}

export const applyLoginRateLimit = (key: string) =>
  check({ tokens: 5, window: "15 m", prefix: "lnc:login" }, key);

export const applyApplicationRateLimit = (key: string) =>
  check({ tokens: 5, window: "1 h", prefix: "lnc:apply" }, key);
