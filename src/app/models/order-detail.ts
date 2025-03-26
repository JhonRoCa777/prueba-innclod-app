import { Product } from "./product";

export interface OrderDetail {
  id: number,
  order_id: number,
  product_id: number,
  quantity: number,
  product?: Product
}

export interface OrderDetailRequest {
  product_id: number,
  quantity: number,
}
