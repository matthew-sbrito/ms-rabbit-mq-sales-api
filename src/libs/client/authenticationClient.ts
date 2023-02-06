import {ResponseErrorException} from "../error/response-error-exception";
import {ResponseError} from "../error/http-error-handling";
import {getEnv} from "@helpers/get-env";

import httpStatus from "http-status-codes";
import {LoggedUser} from "../session/user-session";

const AUTH_URL = `${getEnv("AUTH_HOST")}:${getEnv("AUTH_PORT")}`;

export async function authenticationClient(authorization: string): Promise<LoggedUser> {
    let response;

    try {
        const url = `${AUTH_URL}/api/user/me`;

        response = await fetch(url, {
            headers: {"Authorization": authorization}
        })
    } catch (exception) {
        console.error("Error to authenticate user: ");
        console.error(exception);

        throw new ResponseErrorException(httpStatus.BAD_REQUEST, "Failed to request Authentication API!")
    }

    if (response.ok) return (await response.json()) as LoggedUser;

    const {status, message} = (await response.json()) as ResponseError;

    throw new ResponseErrorException(status, message)
}