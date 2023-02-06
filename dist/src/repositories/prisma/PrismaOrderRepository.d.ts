import { OrderBody, OrderRepository } from "../OrderRepository";
import { Order } from "@prisma/client";
export declare class PrismaOrderRepository implements OrderRepository {
    create(data: OrderBody): Promise<Order>;
    findAll(): Promise<Order[]>;
    findById(id: string): Promise<Order | null>;
    update(id: string, data: Partial<OrderBody>): Promise<Order>;
}
export declare const prismaOrderRepository: PrismaOrderRepository;
