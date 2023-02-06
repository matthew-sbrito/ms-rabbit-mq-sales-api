"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseErrorException = void 0;
class ResponseErrorException extends Error {
    constructor(code, message) {
        super(message);
        this.statusCode = code;
    }
}
exports.ResponseErrorException = ResponseErrorException;
