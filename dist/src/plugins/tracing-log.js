"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tracingLog = void 0;
const response_error_exception_1 = require("../libs/error/response-error-exception");
const uuid_1 = require("uuid");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
function tracingLog(request, response, next) {
    request.headers.serviceId = (0, uuid_1.v4)();
    const { transactionId, serviceId } = request.headers;
    if (!(typeof transactionId == "string") || transactionId == "")
        throw new response_error_exception_1.ResponseErrorException(http_status_codes_1.default.BAD_REQUEST, "The transaction id header is required!");
    console.log(messageLog(request, transactionId, serviceId, request.body));
    response.on("finish", () => {
        console.log(messageLog(request, transactionId, serviceId, response, false));
    });
    return next();
}
exports.tracingLog = tracingLog;
function messageLog(request, transactionId, serviceId, data, isRequest = true) {
    const type = isRequest ? "REQUEST" : "RESPONSE";
    return `[${transactionId}] [${serviceId}] [${type}] [${request.method}] [${request.url}] [${JSON.stringify(data)}]`;
}
