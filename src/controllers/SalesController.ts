import {Request, Response} from "express";
import {sendMessageToProductStockUpdateQueue} from "@rabbitmq/product/product-stock-sender";

import httpStatus from "http-status-codes";

export class SalesController {
    async sendMessageStock(request: Request, response: Response): Promise<Response> {
        const message = await sendMessageToProductStockUpdateQueue(request.body);

        return response
            .status(httpStatus.OK)
            .json(message);
    }
}

export const salesController = new SalesController();