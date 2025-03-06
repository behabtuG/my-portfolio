// lib/rateLimiter.js
export function rateLimit(request) {
  const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
  const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per windowMs
  const rateLimitMap = new Map(); // Store IP addresses and their request counts

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1"; // Get client IP

  // Initialize or update the request count for the client IP
  const currentTime = Date.now();
  const clientData = rateLimitMap.get(clientIp) || {
    count: 0,
    lastRequestTime: currentTime,
  };

  // Reset the count if the window has passed
  if (currentTime - clientData.lastRequestTime > RATE_LIMIT_WINDOW_MS) {
    clientData.count = 0;
    clientData.lastRequestTime = currentTime;
  }

  // Increment the request count
  clientData.count += 1;
  rateLimitMap.set(clientIp, clientData);

  // Check if the client has exceeded the rate limit
  if (clientData.count > RATE_LIMIT_MAX_REQUESTS) {
    return {
      error: "Too many requests. Please try again later.",
      status: 429,
    };
  }

  return null; // No rate limit exceeded
}
