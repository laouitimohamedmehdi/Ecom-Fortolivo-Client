import { CdkStepperModule } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from '../../shared/Models/Basket';
import { FormGroup } from '@angular/forms';
import { IOrder } from '../../shared/Models/order';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [CdkStepperModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent {

  @Input() checkoutForm: FormGroup;
  constructor(private checkoutService: CheckoutService, private basketService: BasketService, private toastr: ToastrService, private router: Router) { }

  submitOrder() {
    const basket = this.basketService.getCurrentBasket();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: ((order: IOrder) => {
        this.toastr.success('Order Submit Successfully');
        this.basketService.deleteLocalBasket(basket.id);
        const navigationExtras: NavigationExtras = { state:order }
        this.router.navigate(['checkout/success'], navigationExtras)
      }),
      error: ((err) => {
        this.toastr.error(err.message);
        console.error(err);
      })
    })
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: this.checkoutForm.get('deliveryForm.deliveryMethod').value,
      shipAddress: this.checkoutForm.get('addressForm').value
    }
  }

}
