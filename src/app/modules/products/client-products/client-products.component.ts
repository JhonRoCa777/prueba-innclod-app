import { Component } from '@angular/core';
import { firstValueFrom, Subscription, take } from 'rxjs';
import { OrderDetailRequest } from 'src/app/models/order-detail';
import { Product } from 'src/app/models/product';
import { ClientService } from 'src/app/services/client.service';
import { OrderService } from 'src/app/services/order.service';
import { SweetUtilService } from 'src/app/services/sweet-util.service';

@Component({
  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.css']
})
export class ClientProductsComponent {

  clientId: number = 0;

  productArray: Product[] = [];
  requestArray: OrderDetailRequest[] = [];
  private subscription!: Subscription;

  constructor(
    private clientService: ClientService,
    private orderService: OrderService
  ){}

  async ngOnInit() {
    this.clientId = (await firstValueFrom(this.clientService.getClientSubject())).id;
    this.reset();
  }

  reset(){
    this.clientService.getClientSubject().subscribe(client => {
      this.clientService.getProducts(client.id)
      .pipe(take(1))
      .subscribe({
        next: (products) => {
          this.productArray = products;
          this.requestArray = products.map(product => ({
            product_id: product.id,
            quantity: 0
          }));
        },
        error: () => SweetUtilService.warning("Error al obtener Productos")
      });
    });
  }

  ngOnDestroy = () => this.subscription.unsubscribe();

  increment(index: number, value: number) {
    const operation = this.requestArray[index].quantity + value;
    if (operation >= 0) {
      this.requestArray[index].quantity = operation;
    }
  }

  toOrder() {
    const resp = this.requestArray.filter(req => req.quantity > 0);
    if(resp.length > 0)
    {
      this.orderService.create(this.clientId, resp)
      .pipe(take(1))
      .subscribe({
        next: () => {
          SweetUtilService.success("Orden Creada");
          this.reset();
        },
        error: (error) => {
          if (error.status === 404) {
            SweetUtilService.warning("No hay Stock");
          } else {
            SweetUtilService.warning("Ocurrió un error al crear la órden");
          }
        }
      });
    }
  }
}
