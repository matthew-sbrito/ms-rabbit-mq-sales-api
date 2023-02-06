import { NextFunction, Request, Response } from "express";
export declare function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void>;
