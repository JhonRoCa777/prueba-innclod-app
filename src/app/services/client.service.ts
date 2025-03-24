import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient) {}

  getByDocument(document: string) {
    return this.http.get<Client>(`${this.apiUrl}/${document}`);
  }
}
