"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const bad_request_error_handling_1 = require("../helpers/bad-request-error-handling");
const response_error_exception_1 = require("../libs/error/response-error-exception");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const PrismaOrderRepository_1 = require("../repositories/prisma/PrismaOrderRepository");
class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async create(userSession, data) {
        try {
            return this.orderRepository.create({
                applicationUserId: userSession.userMongoId,
                status: client_1.OrderStatus.PENDING,
                products: data.products
            });
        }
        catch (e) {
            throw (0, bad_request_error_handling_1.badRequestErrorHandling)(e, "Error to create order!");
        }
    }
    findAll() {
        try {
            return this.orderRepository.findAll();
        }
        catch (e) {
            throw (0, bad_request_error_handling_1.badRequestErrorHandling)(e, "Error to find orders!");
        }
    }
    findById(id) {
        try {
            return this.findOrThrow(id);
        }
        catch (e) {
            throw (0, bad_request_error_handling_1.badRequestErrorHandling)(e, `Error to find user with id ${id}`);
        }
    }
    async updateOrderStatus(orderId, orderStatus) {
        try {
            return this.updateOrThrow(orderId, { status: orderStatus });
        }
        catch (e) {
            throw (0, bad_request_error_handling_1.badRequestErrorHandling)(e, `Error to update order with id ${orderId}`);
        }
    }
    async findOrThrow(id) {
        const order = await this.orderRepository.findById(id);
        if (order != null)
            return order;
        throw new response_error_exception_1.ResponseErrorException(http_status_codes_1.default.NOT_FOUND, `User with id ${id} not found!`);
    }
    async updateOrThrow(id, data) {
        const order = await this.orderRepository.update(id, data);
        if (order != null)
            return order;
        throw new response_error_exception_1.ResponseErrorException(http_status_codes_1.default.NOT_FOUND, `Order with id ${id} not found!`);
    }
}
exports.OrderService = OrderService;
exports.orderService = new OrderService(PrismaOrderRepository_1.prismaOrderRepository);
