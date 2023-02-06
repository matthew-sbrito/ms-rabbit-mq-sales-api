export type UserSession = LoggedUser & {
    userMongoId: string;
};
export interface LoggedUser {
    id: string;
    name: string;
    email: string;
}
