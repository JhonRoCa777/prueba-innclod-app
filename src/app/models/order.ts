import { OrderDetail } from "./order-detail";

export interface Order {
  id: number,
  client_id: number,
  created_at: Date,
  order_details?: OrderDetail[]
}
