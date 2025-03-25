import { Component, ViewChild } from '@angular/core';
import { ClientService } from './services/client.service';
import { Client, ClientIS } from './models/client';
import { Subscription, take } from 'rxjs';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { SweetUtilService } from './services/sweet-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(ClientFormComponent) clientFormComponent!: ClientFormComponent;

  clientFullname = '';

  client$: Client = ClientIS;
  private subscription!: Subscription;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClientSubject().subscribe(client => {
      this.client$ = client;
    });
  }

  ngOnDestroy = () => this.subscription.unsubscribe();

  reset = () => {
    this.clientService.setClientSubject(ClientIS);
    this.clientFullname = '';
  }

  searchClient() {
    if(this.clientFullname){
      this.clientService.getByDocument(this.clientFullname)
      .pipe(take(1))
      .subscribe({
        next: (client) => this.clientService.setClientSubject(client),
        error: () => SweetUtilService.warning("Cliente NO Encontrado")
      });
    }
  }
}
