import {UserSession} from "../../libs/session/user-session";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserSession
        }
    }
}