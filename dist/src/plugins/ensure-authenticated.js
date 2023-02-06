"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const response_error_exception_1 = require("../libs/error/response-error-exception");
const authenticationClient_1 = require("../libs/client/authenticationClient");
const prisma_1 = require("../libs/database/prisma");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AUTHORIZATION_PREFIX = "Bearer ";
async function ensureAuthenticated(request, response, next) {
    const { authorization } = request.headers;
    if (authorization == null || !authorization.includes(AUTHORIZATION_PREFIX))
        throw new response_error_exception_1.ResponseErrorException(http_status_codes_1.default.UNAUTHORIZED, "Token is missing!");
    const loggedUser = await (0, authenticationClient_1.authenticationClient)(authorization);
    const mongoUser = await findOrCreate(loggedUser);
    request.user = {
        ...loggedUser,
        userMongoId: mongoUser.id,
    };
    return next();
}
exports.ensureAuthenticated = ensureAuthenticated;
async function findOrCreate(loggedUser) {
    const user = await prisma_1.prisma
        .applicationUser
        .findUnique({ where: { email: loggedUser.email } });
    if (user != null)
        return user;
    return prisma_1.prisma
        .applicationUser
        .create({
        data: { email: loggedUser.email, name: loggedUser.name }
    });
}
