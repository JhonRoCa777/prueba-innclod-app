import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, ClientIS } from '../models/client';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = `${environment.apiUrl}/clients`;

  private clientSubject = new BehaviorSubject<Client>(ClientIS);
  getClientSubject = () => this.clientSubject.asObservable();
  setClientSubject = (client: Client) => this.clientSubject.next(client);

  constructor(private http: HttpClient) {}

  getByDocument = (document: string) =>
    this.http.get<Client>(`${this.apiUrl}/${document}`);

  getProducts = (id: number) =>
    this.http.get<Product[]>(`${this.apiUrl}/${id}/products`);

  getOrders = (id: number) =>
    this.http.get<Order[]>(`${this.apiUrl}/${id}/orders`);

  create = (client: Client) =>
    this.http.post<Client>(`${this.apiUrl}`, client);

  update = (client: Client) =>
    this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
}
