import {NextFunction, Request, Response} from "express";
import {ResponseErrorException} from "@libs/error/response-error-exception";
import { v4 as uuid } from "uuid";
import httpStatus from "http-status-codes";

export function tracingLog(request: Request, response: Response, next: NextFunction) {
    request.headers.serviceId = uuid()

    const { transactionId, serviceId } = request.headers;

    if(!(typeof transactionId == "string") || transactionId == "")
        throw new ResponseErrorException(httpStatus.BAD_REQUEST, "The transaction id header is required!")

    console.log(messageLog(request, transactionId, serviceId, request.body))

    response.on("finish", () => {
        console.log(messageLog(request, transactionId, serviceId, response, false))
    })

    return next();
}

function messageLog(request: Request, transactionId: string, serviceId: string, data: any, isRequest: boolean = true) {
    const type   = isRequest ? "REQUEST" : "RESPONSE";

    return `[${transactionId}] [${serviceId}] [${type}] [${request.method}] [${request.url}] [${JSON.stringify(data)}]`
}