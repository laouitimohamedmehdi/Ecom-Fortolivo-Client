import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/Pagination';
import { ICategory } from '../shared/Models/Category';
import { map } from 'rxjs';
import { ShopParams } from '../shared/Models/ShopParams';
import { IProducts } from '../shared/Models/Products';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseURl = "https://localhost:44357/api/";
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.categoryId != 0) {
      params = params.append('categoryId', shopParams.categoryId.toString());
    }
    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }
    params = params.append('sort', shopParams.sort);
    params = params.append('pageSize', shopParams.pageSize.toString());
    params = params.append('pageNumber', shopParams.pageNumber.toString());
    return this.http.get<IPagination>(this.baseURl + 'Products/get-all-products', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      )
  }

  getCategory() {
    return this.http.get<ICategory[]>(this.baseURl + 'Categories/get-all-categories');
  }

  getProduct(id:number){
    return this.http.get<IProducts>(this.baseURl +'Products/get-product-by-id/'+id);
  }
}
