import {OrderBody, OrderRepository} from "../OrderRepository";
import {Order} from "@prisma/client";
import {prisma} from "@libs/database/prisma";

export class PrismaOrderRepository implements OrderRepository {
    create(data: OrderBody): Promise<Order> {
        return prisma
            .order
            .create(
                {
                    data: {
                        ...data,
                        products: {
                            createMany: {
                                data: data.products
                            }
                        }
                    }
                }
            );
    }

    findAll(): Promise<Order[]> {
        return prisma
            .order
            .findMany();
    }

    findById(id: string): Promise<Order | null> {
        return prisma
            .order
            .findUnique({where: {id}});
    }

    update(id: string, data: Partial<OrderBody>): Promise<Order> {
        return prisma
            .order
            .update({where: {id}, data: {status: data.status ?? undefined}})
    }
}

export const prismaOrderRepository = new PrismaOrderRepository();