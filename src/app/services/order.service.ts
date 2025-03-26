import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderDetailRequest } from '../models/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  create = (client_id: number, order_details: OrderDetailRequest[]) =>
    this.http.post(`${this.apiUrl}`, { client_id, order_details });
}
