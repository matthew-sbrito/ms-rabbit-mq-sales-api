export declare class ResponseErrorException extends Error {
    statusCode: number;
    constructor(code: number, message: string);
}
