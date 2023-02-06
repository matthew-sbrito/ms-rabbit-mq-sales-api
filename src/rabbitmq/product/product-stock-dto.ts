export interface ProductStockRequest {
    salesId: string
    products: ProductStockItem[]
}

export interface ProductStockItem {
    productId: number
    quantity: number
}
