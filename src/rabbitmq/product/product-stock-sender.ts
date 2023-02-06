import amqp from "amqplib";
import * as env from "@rabbitmq/rabbit-env"

import {ProductStockRequest} from "./product-stock-dto";

export async function sendMessageToProductStockUpdateQueue(message: ProductStockRequest) {
    const jsonMessageBody = JSON.stringify(message);

    const connection = await amqp.connect(env.RABBIT_MQ_URL);
    const channel = await connection.createChannel();

    console.log("Sending message to product update stock: ");
    console.log(jsonMessageBody)

    channel.publish(
        env.PRODUCT_TOPIC,
        env.PRODUCT_STOCK_UPDATE_ROUTING_KEY,
        Buffer.from(jsonMessageBody)
    );

    console.log("Message was sent successfully!")

    return {
        ...message,
        status: "IN_PROGRESS"
    }
}