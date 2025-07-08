import { RouteDefinition } from '../types';
import { userRoutes } from './users';

export const Routes: RouteDefinition[] = [
  ...userRoutes,
];