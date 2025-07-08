# supabase-express-starter

This project is a TypeScript-based Express.js backend starter template designed for building scalable applications. It provides a clean structure for controllers, services, routes, middleware, and type definitions, making it easy to extend and maintain.

## Features
- **TypeScript-first**: Full type safety and modern JavaScript features.
- **Express.js**: Fast, unopinionated, and minimalist web framework.
- **PostgreSQL Integration**: Uses `pg` for database access.
- **Environment Configuration**: Managed with `dotenv`.
- **Dynamic Route Registration**: Easily add new resources and endpoints.
- **Custom Middleware**: Includes authentication and error handling.
- **Service Layer**: Business logic separated from controllers.
- **Ready for Multi-Tenancy**: Structure supports multi-tenant patterns.

## Project Structure

```
app/
  controller/      # Route handlers (controllers)
  db/              # Database connection (PostgreSQL)
  middleware/      # Custom middleware (auth, error handling)
  routes/          # Route definitions and registration
  services/        # Business logic and data access
  types/           # Custom TypeScript types and interfaces
  config/          # App configuration (env, constants)
  server.ts        # App entry point
```

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/obirikan/supabase-express-ts-starter-kit.git
   cd supabase-express-ts-starter-kit
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your database and JWT secrets.

4. **Run the development server:**
   ```sh
   npm run dev
   ```

## Scripts

- `npm run dev` — Start the server with hot-reloading (using `ts-node-dev`)
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Run the compiled server

## Notes

- The template uses a dynamic route registration pattern. Add new routes in the `routes/` folder and controllers in the `controller/` folder.
- Extend the `services/` layer for business logic and database access.
- Customize authentication and error handling in the `middleware/` folder.
- All custom types and interfaces should go in the `types/` folder.

## License

MIT

---
Starter template by obirikan