import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/Models/Basket';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderTotalsComponent } from "../shared/Components/order-totals/order-totals.component";

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderTotalsComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {

  constructor(private basketService:BasketService){}
  basket$:Observable<IBasket>;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  onIncrementQuantity(item: IBasketItem){
    this.basketService.incrmentBasketItemQuantity(item);
  }

  onDecrementQuantity(item: IBasketItem){
    this.basketService.decrmentBasketItemQuantity(item);
  }

  onRemoveBasketItem(item: IBasketItem){
    this.basketService.removeItemBasket(item);
  }
  
}