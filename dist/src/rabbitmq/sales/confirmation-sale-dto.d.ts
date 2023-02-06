import { OrderStatus } from "@prisma/client";
export interface SaleConfirmationMessage {
    salesId: string;
    status: OrderStatus;
}
