// Tiny in-memory rate limiter (per server instance).
// Good enough to slow brute-force on the single-admin login.
const hits = new Map();

export function rateLimit(key, max = 10, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  return { allowed: arr.length <= max, remaining: Math.max(0, max - arr.length) };
}

export function resetRateLimit(key) {
  hits.delete(key);
}
