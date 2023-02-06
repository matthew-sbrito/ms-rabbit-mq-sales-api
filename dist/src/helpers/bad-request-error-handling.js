"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequestErrorHandling = void 0;
const response_error_exception_1 = require("../libs/error/response-error-exception");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
function badRequestErrorHandling(error, message = "Unknown error!") {
    if (error instanceof response_error_exception_1.ResponseErrorException)
        return error;
    return new response_error_exception_1.ResponseErrorException(http_status_codes_1.default.BAD_REQUEST, message);
}
exports.badRequestErrorHandling = badRequestErrorHandling;
