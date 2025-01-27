import { Component } from '@angular/core';
import { BasketSummeryComponent } from "../../shared/Components/basket-summery/basket-summery.component";
import { CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [CdkStepperModule, BasketSummeryComponent],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent {

}
