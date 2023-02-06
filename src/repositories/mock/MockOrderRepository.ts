import {OrderBody, OrderRepository} from "../OrderRepository";
import {Order} from "@prisma/client";

export class MockOrderRepository implements OrderRepository {
    create(data: OrderBody): Promise<Order> {
        throw new Error("Method not implement!");
    }

    findAll(): Promise<Order[]> {
        return Promise.resolve([]);
    }

    findById(id: string): Promise<Order | null> {
        throw new Error("Method not implement!");
    }

    update(id: string, data: Partial<OrderBody>): Promise<Order> {
        throw new Error("Method not implement!");
    }

}