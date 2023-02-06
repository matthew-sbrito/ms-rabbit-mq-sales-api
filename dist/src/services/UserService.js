"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const prisma_1 = require("../libs/database/prisma");
const PrismaUserRepository_1 = require("../repositories/prisma/PrismaUserRepository");
const response_error_exception_1 = require("../libs/error/response-error-exception");
const bad_request_error_handling_1 = require("../helpers/bad-request-error-handling");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(data) {
        return this.userRepository.create(data);
    }
    findById(id) {
        try {
            return this.findOrThrow({ id });
        }
        catch (e) {
            throw (0, bad_request_error_handling_1.badRequestErrorHandling)(e, `Error to find user with id ${id}`);
        }
    }
    findByEmail(email) {
        try {
            return this.findOrThrow({ email });
        }
        catch (e) {
            throw (0, bad_request_error_handling_1.badRequestErrorHandling)(e, `Error to find user with email ${email}`);
        }
    }
    async findOrThrow(where) {
        const user = await prisma_1.prisma
            .applicationUser
            .findUnique({ where });
        if (user != null)
            return user;
        throw new response_error_exception_1.ResponseErrorException(http_status_codes_1.default.NOT_FOUND, `User with param ${where.email ?? where.id} not found!`);
    }
}
exports.UserService = UserService;
exports.userService = new UserService(PrismaUserRepository_1.prismaUserRepository);
