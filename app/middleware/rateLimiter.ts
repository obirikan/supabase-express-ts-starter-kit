import { RateLimiterMemory } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";

const opts = {
  points: 8, 
  duration: 60, 
};

const rateLimiter = new RateLimiterMemory(opts);

interface RateLimitRequest extends Request {
    ip: string;
}

interface RateLimitResponse extends Response {}

type RateLimitNextFunction = NextFunction;

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