import {Repository} from "./Repository";
import {Order, OrderStatus} from "@prisma/client";

export interface ProductOrderBody {
    productId: number
    quantity: number
}
export interface OrderBody {
    products: ProductOrderBody[]
    applicationUserId: string
    status: OrderStatus
}

export interface OrderRepository extends Repository<Order, string, OrderBody> {
}