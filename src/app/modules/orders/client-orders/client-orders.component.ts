import { Component } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { Order } from 'src/app/models/order';
import { ClientService } from 'src/app/services/client.service';
import { SweetUtilService } from 'src/app/services/sweet-util.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent {

    orderArray: Order[] = [];
    private subscription!: Subscription;

    constructor(private clientService: ClientService){}

    ngOnInit() {
      this.clientService.getClientSubject().subscribe(client => {
        this.clientService.getOrders(client.id)
              .pipe(take(1))
              .subscribe({
                next: (orders) => this.orderArray = orders,
                error: () => SweetUtilService.warning("Error al obtener Ordenes")
              });
      });
    }

    ngOnDestroy = () => this.subscription.unsubscribe();
}
