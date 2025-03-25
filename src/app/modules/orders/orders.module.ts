import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [ClientOrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
