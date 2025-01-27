import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IDeliveryMethod } from '../shared/Models/deliveryMethod';
import { map } from 'rxjs';
import { IOrderToCreate } from '../shared/Models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseURl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getDeliveryMethod() {
    return this.http.get(this.baseURl + 'Orders/Get-Delivery-Methods')
      .pipe(
        map((res: IDeliveryMethod[]) => {
          return res.sort((a, b) => b.price - a.price);
        })
      )
  }

  createOrder(order: IOrderToCreate) {
    return this.http.post(this.baseURl + 'Orders/Create-Order', order);
  }
}
