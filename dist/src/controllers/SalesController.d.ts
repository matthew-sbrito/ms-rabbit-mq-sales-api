import { Request, Response } from "express";
export declare class SalesController {
    sendMessageStock(request: Request, response: Response): Promise<Response>;
}
export declare const salesController: SalesController;
