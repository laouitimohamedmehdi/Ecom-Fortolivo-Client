import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProducts } from '../shared/Models/Products';
import { ShopService } from './shop.service';
import { CommonModule } from '@angular/common';
import { ShopItemComponent } from "./shop-item/shop-item.component";
import { ICategory } from '../shared/Models/Category';
import { SharedModule } from '../shared/shared.module';
import { ShopParams } from '../shared/Models/ShopParams';
import { PagingHeaderComponent } from '../shared/Components/paging-header/paging-header.component';
import { PagerComponent } from '../shared/Components/pager/pager.component';


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ShopItemComponent, SharedModule, PagingHeaderComponent, PagerComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  products: IProducts[];
  category: ICategory[];
  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    { name: 'Name', Value: 'Name' },
    { name: 'Price: Max:Min', Value: 'PriceDesc' },
    { name: 'Price: Min:Max', Value: 'PriceAsc' }
  ]

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(res => {
      this.products = res.data
      this.totalCount = res.count;
      this.shopParams.pageNumber = res.pageNumber;
      this.shopParams.pageSize = res.pageSize;
    })
  }

  getCategories() {
    this.shopService.getCategory().subscribe(res => {
      this.category = [{ id: 0, name: 'All', description: '' }, ...res];
    })
  }

  onCategorySelect(categoryId: number) {
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelect(sort: Event) {
    this.shopParams.sort = (sort.target as HTMLInputElement).value;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchInput.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchInput.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}