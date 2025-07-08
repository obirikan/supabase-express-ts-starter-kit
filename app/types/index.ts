import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
}

export interface RouteDefinition {
  method: "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
  route: string;
  controller: new () => any;
  action: string;
  middlewares?: Array<(req: Request, res: Response, next: NextFunction) => void>;
}

declare global {
  namespace Express {
    interface Request {
      user?: any; // givin it a type of "any" for now 
    }
  }
}