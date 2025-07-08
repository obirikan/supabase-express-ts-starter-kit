import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import {Routes}  from "./routes/index";
import { handleError } from "./middleware/index";
import { port } from "./config";
import { RouteDefinition } from "./types";

dotenv.config();

const app = express();


//middlewares
app.use(cors());
app.use(morgan("combined"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));


Routes.forEach((route: RouteDefinition) => {
  const middlewares: Array<(req: Request, res: Response, next: NextFunction) => void> = route.middlewares || [];
  (app as express.Application)[route.method](
    route.route,
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
        const controller: any = new (route.controller as { new (): any })();
        const result: any = await controller[route.action](req, res, next);

        if (result !== null && result !== undefined) {
          return result;
        }
      } catch (error) {
        console.error("Route error:", error);
        next(error);
      }
    }
  );
});

// Global error handler
app.use(handleError);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
