import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from '../../shared/Models/deliveryMethod';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CdkStepperModule],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutForm:FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethod()
      .subscribe({
        next:(res: IDeliveryMethod[])=> {
          this.deliveryMethods = res;
        },
        error: (err) => { console.error(err) }
      })
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.basketService.setShippingPrice(deliveryMethod);
  }

}
