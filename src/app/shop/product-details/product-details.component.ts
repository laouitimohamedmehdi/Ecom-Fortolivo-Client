import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../../shared/Models/Products';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product: IProducts;
  constructor(private shopService: ShopService, private activeRoute: ActivatedRoute, private bcService: BreadcrumbService) {
    this.bcService.set('@productDetails',' ');
   }

  ngOnInit(): void {
    this.bcService.set('@productDetails',' ');
    this.loadProduct();
  }

  loadProduct() {
    this.shopService.getProduct(parseInt(this.activeRoute.snapshot.paramMap.get('id')))
      .subscribe(res => {
        this.product = res
        this.bcService.set('@productDetails', res.name)
      });
  }
}
