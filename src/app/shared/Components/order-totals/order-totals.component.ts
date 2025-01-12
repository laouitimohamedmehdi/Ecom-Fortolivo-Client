import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../Models/Basket';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-totals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss'
})
export class OrderTotalsComponent implements OnInit{

  basketTotal$ : Observable<IBasketTotals>;
  constructor(private basketService: BasketService){}

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.basketTotal$;
  }
}
