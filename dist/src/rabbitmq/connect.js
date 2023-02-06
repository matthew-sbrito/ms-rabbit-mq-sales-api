"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const env = __importStar(require("./rabbit-env"));
const confirmation_sale_queue_1 = require("./sales/confirmation-sale-queue");
async function connectRabbitMQ() {
    try {
        const connection = await amqplib_1.default.connect(env.RABBIT_MQ_URL);
        await Promise.all([
            createQueue(connection, env.PRODUCT_STOCK_UPDATE_QUEUE, env.PRODUCT_STOCK_UPDATE_ROUTING_KEY, env.PRODUCT_TOPIC),
            createQueue(connection, env.SALES_CONFIRMATION_QUEUE, env.SALES_CONFIRMATION_ROUTING_KEY, env.PRODUCT_TOPIC),
        ]);
        await (0, confirmation_sale_queue_1.messageListenerForSaleConfirmationQueue)(connection);
    }
    catch (exception) {
        console.error("Error to connect RabbitMQ: ");
        console.error(exception);
        throw exception;
    }
}
exports.connectRabbitMQ = connectRabbitMQ;
async function createQueue(connection, queue, routingKey, topic) {
    const channel = await connection.createChannel();
    await channel.assertExchange(topic, "topic", { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, topic, routingKey);
}
