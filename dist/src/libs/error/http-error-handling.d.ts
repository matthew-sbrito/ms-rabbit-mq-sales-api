import { NextFunction, Request, Response } from "express";
export interface ResponseError {
    status: number;
    message: string;
    reason: string;
    timestamp: string;
}
export declare function httpErrorHandling(error: Error, request: Request, response: Response, next: NextFunction): Response;
