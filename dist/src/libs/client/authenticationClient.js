"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationClient = void 0;
const response_error_exception_1 = require("../error/response-error-exception");
const get_env_1 = require("../../helpers/get-env");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AUTH_URL = `${(0, get_env_1.getEnv)("AUTH_HOST")}:${(0, get_env_1.getEnv)("AUTH_PORT")}`;
async function authenticationClient(authorization) {
    let response;
    try {
        const url = `${AUTH_URL}/api/user/me`;
        response = await fetch(url, {
            headers: { "Authorization": authorization }
        });
    }
    catch (exception) {
        console.error("Error to authenticate user: ");
        console.error(exception);
        throw new response_error_exception_1.ResponseErrorException(http_status_codes_1.default.BAD_REQUEST, "Failed to request Authentication API!");
    }
    if (response.ok)
        return (await response.json());
    const { status, message } = (await response.json());
    throw new response_error_exception_1.ResponseErrorException(status, message);
}
exports.authenticationClient = authenticationClient;
