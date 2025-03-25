import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProductsComponent } from './client-products/client-products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ClientProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
