import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CheckoutAddressComponent } from "./checkout-address/checkout-address.component";
import { CheckoutDeliveryComponent } from "./checkout-delivery/checkout-delivery.component";
import { CheckoutReviewComponent } from "./checkout-review/checkout-review.component";
import { CheckoutPaymentComponent } from "./checkout-payment/checkout-payment.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    SharedModule, 
    CheckoutAddressComponent, 
    CheckoutDeliveryComponent, 
    CheckoutReviewComponent, 
    CheckoutPaymentComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  checkoutForm:FormGroup;
  constructor(private fb:FormBuilder,private accountService:AccountService,private basketServices:BasketService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValues();
    // this.getDeliveryMethodValue();
  }
  
  createCheckoutForm(){
    this.checkoutForm = this.fb.group({
      addressForm:this.fb.group({
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        street:['',Validators.required],
        city:['',Validators.required],
        state:['',Validators.required],
        zipCode:['',Validators.required]
      }),
      deliveryForm:this.fb.group({
        deliveryMethod:['',Validators.required]
      }),
      paymentForm:this.fb.group({
        nameOnCard:['',Validators.required]
      })
    });
  }
  getAddressFormValues(){
    this.accountService.getUserAddress().subscribe({
      next:((address)=>{
        this.checkoutForm.get('addressForm').patchValue(address);
      }),
      error:(err=>{console.log(err)})
    })
  }
  // getDeliveryMethodValue(){
  //   const basket = this.basketServices.getCurrentBasketValue();
  //   if(basket.deliveryMethodId !==null){
  //     this.checkoutForm.get('deliveryForm.deliveryMethod').patchValue(basket.deliveryMethodId.toString())
  //   }
  // }

}