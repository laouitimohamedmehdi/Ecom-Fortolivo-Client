import { Component, Input } from '@angular/core';
import { IProducts } from '../../shared/Models/Products';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss'
})
export class ShopItemComponent{
  @Input() product: IProducts;

  constructor(private basketService:BasketService){}

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product);
  }
}
