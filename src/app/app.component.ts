import { Component } from '@angular/core';
import { ClientService } from './services/client.service';
import { Client } from './models/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba-innclod-app';

  documentSearch: string = '';
  clientName: string = '';

  constructor(private clientService: ClientService) {}

  searchClient() {
    this.clientService.getByDocument(this.documentSearch).subscribe({
      next: (client: Client) => {
        this.clientName = client.fullname;
      },
      error: () => {
        this.clientName = 'Cliente NO Encontrado';
      }
    });
  }
}
