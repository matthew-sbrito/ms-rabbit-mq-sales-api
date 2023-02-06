"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaOrderRepository = exports.PrismaOrderRepository = void 0;
const prisma_1 = require("../../libs/database/prisma");
class PrismaOrderRepository {
    create(data) {
        return prisma_1.prisma
            .order
            .create({
            data: {
                ...data,
                products: {
                    createMany: {
                        data: data.products
                    }
                }
            }
        });
    }
    findAll() {
        return prisma_1.prisma
            .order
            .findMany();
    }
    findById(id) {
        return prisma_1.prisma
            .order
            .findUnique({ where: { id } });
    }
    update(id, data) {
        return prisma_1.prisma
            .order
            .update({ where: { id }, data: { status: data.status ?? undefined } });
    }
}
exports.PrismaOrderRepository = PrismaOrderRepository;
exports.prismaOrderRepository = new PrismaOrderRepository();
