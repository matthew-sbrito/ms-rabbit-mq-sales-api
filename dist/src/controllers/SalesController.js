"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesController = exports.SalesController = void 0;
const product_stock_sender_1 = require("../rabbitmq/product/product-stock-sender");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class SalesController {
    async sendMessageStock(request, response) {
        const message = await (0, product_stock_sender_1.sendMessageToProductStockUpdateQueue)(request.body);
        return response
            .status(http_status_codes_1.default.OK)
            .json(message);
    }
}
exports.SalesController = SalesController;
exports.salesController = new SalesController();
