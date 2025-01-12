import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { CarouselComponent } from '../core/carousel/carousel.component';
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component';
import { CarouselModule } from '../core/carousel/carousel.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    PaginationModule,
    CarouselModule
  ]
})
export class SharedModule { }
