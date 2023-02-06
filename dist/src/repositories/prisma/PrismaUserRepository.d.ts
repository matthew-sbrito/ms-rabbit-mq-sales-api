import { ApplicationUserBody, UserRepository } from "../UserRepository";
import { ApplicationUser } from "@prisma/client";
export declare class PrismaUserRepository implements UserRepository {
    create(data: ApplicationUserBody): Promise<ApplicationUser>;
    findAll(): Promise<ApplicationUser[]>;
    findById(id: string): Promise<ApplicationUser | null>;
    findByEmail(email: string): Promise<ApplicationUser | null>;
    update(id: string, data: Partial<ApplicationUserBody>): Promise<ApplicationUser>;
}
export declare const prismaUserRepository: PrismaUserRepository;
