import {prisma} from "@libs/database/prisma";
import {prismaUserRepository} from "../repositories/prisma/PrismaUserRepository";

import {ApplicationUserBody, UserRepository} from "../repositories/UserRepository";
import {ApplicationUser, Prisma} from "@prisma/client";
import {ResponseErrorException} from "@libs/error/response-error-exception";

import {badRequestErrorHandling} from "@helpers/bad-request-error-handling";

import httpStatus from "http-status-codes";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    create(data: ApplicationUserBody): Promise<ApplicationUser> {
        return this.userRepository.create(data);
    }

    findById(id: string): Promise<ApplicationUser> {
        try {
            return this.findOrThrow({ id });
        } catch (e) {
            throw badRequestErrorHandling(e, `Error to find user with id ${id}`);
        }
    }

    findByEmail(email: string): Promise<ApplicationUser> {
        try {
            return this.findOrThrow({ email });
        } catch (e) {
            throw badRequestErrorHandling(e, `Error to find user with email ${email}`);
        }
    }

    private async findOrThrow(where: Prisma.ApplicationUserWhereUniqueInput ): Promise<ApplicationUser> {
        const user = await prisma
            .applicationUser
            .findUnique({ where });

        if(user != null)  return user;

        throw new ResponseErrorException(httpStatus.NOT_FOUND, `User with param ${where.email ?? where.id} not found!`);
    }
}

export const userService = new UserService(prismaUserRepository);