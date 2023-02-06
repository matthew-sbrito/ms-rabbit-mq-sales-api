import {NextFunction, Request, Response} from "express";
import {ResponseErrorException} from "@libs/error/response-error-exception";
import {authenticationClient} from "@libs/client/authenticationClient";

import {prisma} from "@libs/database/prisma";
import {ApplicationUser} from "@prisma/client";
import {LoggedUser} from "@libs/session/user-session";

import httpStatus from "http-status-codes";

const AUTHORIZATION_PREFIX = "Bearer ";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const {authorization} = request.headers;

    if (authorization == null || !authorization.includes(AUTHORIZATION_PREFIX))
        throw new ResponseErrorException(httpStatus.UNAUTHORIZED, "Token is missing!");

    const loggedUser = await authenticationClient(authorization);
    const mongoUser = await findOrCreate(loggedUser);

    request.user = {
        ...loggedUser,
        userMongoId: mongoUser.id,
    }

    return next();
}

async function findOrCreate(loggedUser: LoggedUser): Promise<ApplicationUser> {
    const user = await prisma
        .applicationUser
        .findUnique({where: {email: loggedUser.email}});

    if (user != null) return user;

    return prisma
        .applicationUser
        .create({
            data: {email: loggedUser.email, name: loggedUser.name}
        });
}