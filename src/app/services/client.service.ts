import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, ClientIS } from '../models/client';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

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

  create = (client: Client) =>
    this.http.post<Client>(`${this.apiUrl}`, client);

  update = (client: Client) =>
    this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
}
