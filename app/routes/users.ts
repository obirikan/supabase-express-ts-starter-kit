import { UsersController } from '../controller/users';
// import { authMiddleware } from '../middleware';
import { RouteDefinition } from '../types';

export const userRoutes: RouteDefinition[] = [
  {
    method: "get",
    route: "/users",
    controller: UsersController,
    action: "getUsers",
    // middlewares: [authMiddleware] // optional
  },
];