"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const main_1 = require("./middlewares/main");
const config_1 = require("./config");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Enable CORS
app.use((0, morgan_1.default)("combined")); // Log all requests
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: false })); // Parse form data
index_1.default.forEach((route) => {
    const middlewares = route.middlewares || [];
    app[route.method](route.route, ...middlewares, async (req, res, next) => {
        try {
            const controller = new route.controller();
            const result = await controller[route.action](req, res, next);
            if (result !== null && result !== undefined) {
                return result;
            }
        }
        catch (error) {
            console.error("Route error:", error);
            next(error);
        }
    });
});
// Global error handler
app.use(main_1.handleError);
// Start server
app.listen(config_1.port, () => {
    console.log(`Server running on http://localhost:${config_1.port}`);
});
