import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { IBasket, IBasketItem } from '../../Models/Basket';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket-summery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './basket-summery.component.html',
  styleUrl: './basket-summery.component.scss'
})
export class BasketSummeryComponent implements OnInit {

  basket$:Observable<IBasket>;
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket:boolean = true;
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  onIncrementQuantity(item: IBasketItem){
    this.increment.emit(item)
  }

  onDecrementQuantity(item: IBasketItem){
    this.decrement.emit(item);
  }

  onRemoveBasketItem(item: IBasketItem){
    this.remove.emit(item);
  }

}
