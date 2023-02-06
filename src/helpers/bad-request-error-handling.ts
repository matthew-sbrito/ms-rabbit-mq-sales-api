import {ResponseErrorException} from "@libs/error/response-error-exception";
import httpStatus from "http-status-codes";

export function badRequestErrorHandling(error: Error | any | unknown, message: string = "Unknown error!") {
    if(error instanceof ResponseErrorException) return error;

    return new ResponseErrorException(httpStatus.BAD_REQUEST, message);
}