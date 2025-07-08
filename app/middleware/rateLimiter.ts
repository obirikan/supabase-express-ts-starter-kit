import { RateLimiterMemory } from "rate-limiter-flexible";
import { RateLimitNextFunction, RateLimitRequest, RateLimitResponse } from "../types";

const opts = {
  points: 8, 
  duration: 60, 
};

const rateLimiter = new RateLimiterMemory(opts);

export const rateLimitMiddleware = async (
    req: RateLimitRequest,
    res: RateLimitResponse,
    next: RateLimitNextFunction
): Promise<void> => {
    try {
        await rateLimiter.consume(req.ip);
        next();
    } catch {
        res.status(429).send("Too Many Requests");
    }
};