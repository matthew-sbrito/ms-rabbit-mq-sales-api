import { OrderBody, OrderRepository } from "../repositories/OrderRepository";
import { Order, OrderStatus } from "@prisma/client";
import { UserSession } from "../libs/session/user-session";
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: OrderRepository);
    create(userSession: UserSession, data: Omit<OrderBody, "status" | "applicationUserId">): Promise<Order>;
    findAll(): Promise<Order[]>;
    findById(id: string): Promise<Order>;
    updateOrderStatus(orderId: string, orderStatus: OrderStatus): Promise<Order>;
    private findOrThrow;
    private updateOrThrow;
}
export declare const orderService: OrderService;
