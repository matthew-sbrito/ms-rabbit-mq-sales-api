import { LoggedUser } from "../session/user-session";
export declare function authenticationClient(authorization: string): Promise<LoggedUser>;
