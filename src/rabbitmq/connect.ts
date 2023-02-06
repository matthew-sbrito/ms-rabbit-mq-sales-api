import amqp, {Connection} from "amqplib";
import * as env from "./rabbit-env";

import {messageListenerForSaleConfirmationQueue} from "@rabbitmq/sales/confirmation-sale-queue";

export async function connectRabbitMQ() {
   try {
       const connection = await amqp.connect(env.RABBIT_MQ_URL);

       await Promise.all( [
           createQueue(connection, env.PRODUCT_STOCK_UPDATE_QUEUE, env.PRODUCT_STOCK_UPDATE_ROUTING_KEY, env.PRODUCT_TOPIC),
           createQueue(connection, env.SALES_CONFIRMATION_QUEUE, env.SALES_CONFIRMATION_ROUTING_KEY, env.PRODUCT_TOPIC),
       ]);

       await messageListenerForSaleConfirmationQueue(connection);
   } catch (exception) {
       console.error("Error to connect RabbitMQ: ");
       console.error(exception);
       throw exception;
   }
}

async function createQueue(connection: Connection, queue: string, routingKey: string, topic: string) {
    const channel = await connection.createChannel();

    await channel.assertExchange(topic, "topic", {durable: true});
    await channel.assertQueue(queue, {durable: true});
    await channel.bindQueue(queue, topic, routingKey)
}