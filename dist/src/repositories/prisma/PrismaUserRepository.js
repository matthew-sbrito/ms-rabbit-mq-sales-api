"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaUserRepository = exports.PrismaUserRepository = void 0;
const prisma_1 = require("../../libs/database/prisma");
class PrismaUserRepository {
    create(data) {
        return prisma_1.prisma.applicationUser.create({ data });
    }
    findAll() {
        return prisma_1.prisma.applicationUser.findMany();
    }
    findById(id) {
        return prisma_1.prisma.applicationUser.findUnique({ where: { id } });
    }
    findByEmail(email) {
        return prisma_1.prisma.applicationUser.findUnique({ where: { email } });
    }
    update(id, data) {
        throw new Error("Method not implement!");
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
exports.prismaUserRepository = new PrismaUserRepository();
