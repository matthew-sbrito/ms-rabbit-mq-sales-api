import {OrderBody, OrderRepository} from "../repositories/OrderRepository";
import {Order, OrderStatus} from "@prisma/client";
import {badRequestErrorHandling} from "@helpers/bad-request-error-handling";
import {prisma} from "@libs/database/prisma";
import {ResponseErrorException} from "@libs/error/response-error-exception";
import {UserSession} from "@libs/session/user-session";

import httpStatus from "http-status-codes";
import {prismaOrderRepository} from "../repositories/prisma/PrismaOrderRepository";

export class OrderService {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async create(userSession: UserSession, data: Omit<OrderBody, "status" | "applicationUserId">): Promise<Order> {
        try {
            return this.orderRepository.create({
                applicationUserId: userSession.userMongoId,
                status: OrderStatus.PENDING,
                products: data.products
            });
        } catch (e) {
            throw badRequestErrorHandling(e, "Error to create order!");
        }
    }

    findAll(): Promise<Order[]> {
        try {
            return this.orderRepository.findAll();
        } catch (e) {
            throw badRequestErrorHandling(e, "Error to find orders!");
        }
    }

    findById(id: string): Promise<Order> {
        try {
            return this.findOrThrow(id);
        } catch (e) {
            throw badRequestErrorHandling(e, `Error to find user with id ${id}`);
        }
    }

    async updateOrderStatus(orderId: string, orderStatus: OrderStatus): Promise<Order> {
        try {
            return this.updateOrThrow(orderId, {status: orderStatus});
        } catch (e) {
            throw badRequestErrorHandling(e, `Error to update order with id ${orderId}`)
        }
    }

    private async findOrThrow(id: string): Promise<Order> {
        const order = await this.orderRepository.findById(id);

        if (order != null) return order;

        throw new ResponseErrorException(httpStatus.NOT_FOUND, `User with id ${id} not found!`);
    }

    private async updateOrThrow(id: string, data: Partial<Order>): Promise<Order> {
        const order = await this.orderRepository.update(id, data);

        if (order != null) return order;

        throw new ResponseErrorException(httpStatus.NOT_FOUND, `Order with id ${id} not found!`);
    }
}

export const orderService = new OrderService(prismaOrderRepository);