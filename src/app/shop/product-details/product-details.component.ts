import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../../shared/Models/Products';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product: IProducts;
  quantity: number = 1;
  constructor(private shopService: ShopService, private activeRoute: ActivatedRoute, private bcService: BreadcrumbService, private basketService: BasketService) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.bcService.set('@productDetails', ' ');
    this.loadProduct();
  }

  loadProduct() {
    this.shopService.getProduct(parseInt(this.activeRoute.snapshot.paramMap.get('id')))
      .subscribe(res => {
        this.product = res
        this.bcService.set('@productDetails', res.name)
      });
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  onIncrementQuantity() {
    this.quantity ++;
  }

  onDecrementQuantity() {
    if(this.quantity>1){
      this.quantity--;
    }
  }
}
