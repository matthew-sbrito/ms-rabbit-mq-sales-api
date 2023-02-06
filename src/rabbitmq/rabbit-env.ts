import {getEnv} from "@helpers/get-env";

export const PRODUCT_TOPIC = getEnv("PRODUCT_TOPIC");
export const PRODUCT_STOCK_UPDATE_QUEUE = getEnv("PRODUCT_STOCK_UPDATE_QUEUE");
export const PRODUCT_STOCK_UPDATE_ROUTING_KEY = getEnv("PRODUCT_STOCK_UPDATE_ROUTING_KEY");
export const SALES_CONFIRMATION_QUEUE = getEnv("SALES_CONFIRMATION_QUEUE");
export const SALES_CONFIRMATION_ROUTING_KEY = getEnv("SALES_CONFIRMATION_ROUTING_KEY");
export const RABBIT_MQ_HOST = getEnv("RABBIT_MQ_HOST");
export const RABBIT_MQ_PORT = getEnv("RABBIT_MQ_PORT");

export const RABBIT_MQ_URL = `amqp://${RABBIT_MQ_HOST}:${RABBIT_MQ_PORT}`;



