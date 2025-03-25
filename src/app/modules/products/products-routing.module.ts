import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProductsComponent } from './client-products/client-products.component';

const routes: Routes = [
  { path: '', component: ClientProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
