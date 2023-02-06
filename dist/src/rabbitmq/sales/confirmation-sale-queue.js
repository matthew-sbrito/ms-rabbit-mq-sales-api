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
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageListenerForSaleConfirmationQueue = void 0;
const env = __importStar(require("../rabbit-env"));
const OrderService_1 = require("../../services/OrderService");
async function messageListenerForSaleConfirmationQueue(connection) {
    const channel = await connection.createChannel();
    await channel.consume(env.SALES_CONFIRMATION_QUEUE, onSaleConfirmationMessage, { noAck: true });
}
exports.messageListenerForSaleConfirmationQueue = messageListenerForSaleConfirmationQueue;
async function onSaleConfirmationMessage(message) {
    if (message == null)
        return;
    const confirmationMessage = JSON.parse(message.content.toString());
    console.log(`Receiving message from queue: [${confirmationMessage}]`);
    try {
        await OrderService_1.orderService.updateOrderStatus(confirmationMessage.salesId, confirmationMessage.status);
        console.log(`Order with id [${confirmationMessage.salesId}] was update successfully!`);
    }
    catch (e) {
        console.error(`Order with id [${confirmationMessage.salesId}] was update failed!`);
    }
}
