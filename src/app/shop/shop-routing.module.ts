import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BreadcrumbComponent } from 'xng-breadcrumb';

export const routes: Routes = [
    { path: '', component: ShopComponent},
    { path: ':id', component: ProductDetailsComponent, data:{breadcrumb:{alias:'productDetails'}}}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ShopRoutingModule { }
