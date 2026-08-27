type Entry = { count: number; resetAt: number };
const memoryStore = new Map<string, Entry>();

export function checkRateLimit(key: string, now = Date.now()) {
  const windowSeconds = Number(process.env.INQUIRY_RATE_LIMIT_WINDOW_SECONDS ?? "60");
  const max = Number(process.env.INQUIRY_RATE_LIMIT_MAX_REQUESTS ?? "5");
  const windowMs = Number.isFinite(windowSeconds) ? Math.max(10, windowSeconds) * 1000 : 60_000;
  const limit = Number.isFinite(max) ? Math.max(1, max) : 5;
  const current = memoryStore.get(key);
  if (!current || current.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  if (current.count >= limit) return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export function resetRateLimitForTests() { memoryStore.clear(); }
