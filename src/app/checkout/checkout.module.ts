import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    CheckoutAddressComponent
  ]
})
export class CheckoutModule { }