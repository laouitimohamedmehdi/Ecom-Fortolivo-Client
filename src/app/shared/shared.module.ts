import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { CarouselComponent } from '../core/carousel/carousel.component';
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component';
import { CarouselModule } from '../core/carousel/carousel.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './Components/stepper/stepper.component';
import { BasketSummeryComponent } from './Components/basket-summery/basket-summery.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrderTotalsComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummeryComponent
  ],
  exports:[
    PaginationModule,
    CarouselModule,
    OrderTotalsComponent,
    CdkStepperModule,
    StepperComponent
  ]
})
export class SharedModule { }
