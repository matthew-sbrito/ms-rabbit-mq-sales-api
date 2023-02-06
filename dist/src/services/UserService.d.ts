import { ApplicationUserBody, UserRepository } from "../repositories/UserRepository";
import { ApplicationUser } from "@prisma/client";
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    create(data: ApplicationUserBody): Promise<ApplicationUser>;
    findById(id: string): Promise<ApplicationUser>;
    findByEmail(email: string): Promise<ApplicationUser>;
    private findOrThrow;
}
export declare const userService: UserService;
