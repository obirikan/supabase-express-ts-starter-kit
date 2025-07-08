import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types";

export function handleError(
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(error.statusCode || 500).send({ message: error.message });
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: "Internal server error - JWT secret not configured",
      });
    }
    const decoded = jwt.verify(token, jwtSecret as string);
    req.user = decoded;
    next();
  } catch (error) {
    let message = "Unauthorized - Invalid token";

    if (error instanceof jwt.TokenExpiredError) {
      message = "Unauthorized - Token expired";
    } else if (error instanceof jwt.JsonWebTokenError) {
      message = "Unauthorized - Token verification failed";
    }

    return res.status(401).json({
      success: false,
      message,
    });
  }
};
