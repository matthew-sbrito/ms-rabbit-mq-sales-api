import { ProductStockRequest } from "./product-stock-dto";
export declare function sendMessageToProductStockUpdateQueue(message: ProductStockRequest): Promise<{
    status: string;
    salesId: string;
    products: import("./product-stock-dto").ProductStockItem[];
}>;
