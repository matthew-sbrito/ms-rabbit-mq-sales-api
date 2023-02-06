"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_error_handling_1 = require("./libs/error/http-error-handling");
const ensure_authenticated_1 = require("./plugins/ensure-authenticated");
const connect_1 = require("./rabbitmq/connect");
const sales_router_1 = require("./routes/sales-router");
const tracing_log_1 = require("./plugins/tracing-log");
const app = (0, express_1.default)();
const env = process.env;
const PORT = env.PORT ?? 8082;
(0, connect_1.connectRabbitMQ)()
    .then(() => console.log("Connect RabbitMQ successfully!"))
    .catch(() => console.log("Connect RabbitMQ failed!"));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(tracing_log_1.tracingLog);
app.get("/api/status", (request, response) => {
    return response.status(200).json({ service: 'Sales API', status: "UP" });
});
app.use(ensure_authenticated_1.ensureAuthenticated);
app.use(sales_router_1.salesRouter);
app.use(http_error_handling_1.httpErrorHandling);
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
