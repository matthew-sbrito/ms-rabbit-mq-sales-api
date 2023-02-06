"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpErrorHandling = void 0;
const response_error_exception_1 = require("./response-error-exception");
const http_status_codes_1 = __importStar(require("http-status-codes"));
function httpErrorHandling(error, request, response, next) {
    console.log("Error handling was called!");
    console.log(error.message);
    const status = (error instanceof response_error_exception_1.ResponseErrorException) ? error.statusCode : http_status_codes_1.default.INTERNAL_SERVER_ERROR;
    const message = (error instanceof response_error_exception_1.ResponseErrorException) ? error.message : "Unknown error!";
    const reason = (0, http_status_codes_1.getReasonPhrase)(status);
    const timestamp = new Date();
    return response
        .status(status)
        .json({ status, reason, message, timestamp });
}
exports.httpErrorHandling = httpErrorHandling;
