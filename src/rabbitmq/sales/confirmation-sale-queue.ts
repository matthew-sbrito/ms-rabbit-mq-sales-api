import {Connection, ConsumeMessage} from "amqplib";
import {SaleConfirmationMessage} from "./confirmation-sale-dto";

import * as env from "@rabbitmq/rabbit-env"
import {orderService} from "@services/OrderService";

export async function messageListenerForSaleConfirmationQueue(connection: Connection) {
    const channel = await connection.createChannel()

    await channel.consume(
        env.SALES_CONFIRMATION_QUEUE,
        onSaleConfirmationMessage,
        { noAck: true }
    );
}

async function onSaleConfirmationMessage(message: ConsumeMessage | null) {
    if(message == null) return;

    const confirmationMessage = JSON.parse(message.content.toString()) as SaleConfirmationMessage;
    console.log(`Receiving message from queue: [${confirmationMessage}]`)

    try {
        await orderService.updateOrderStatus(confirmationMessage.salesId, confirmationMessage.status);
        console.log(`Order with id [${confirmationMessage.salesId}] was update successfully!`)
    } catch (e) {
        console.error(`Order with id [${confirmationMessage.salesId}] was update failed!`)
    }
}