import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../shared/Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseURl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersForUser() {
    return this.http.get(this.baseURl + 'Orders/Get-Order-For-User');
  }

  getOrderDetails(id: number) {
    return this.http.get(this.baseURl + 'Orders/Get-Order-By-Id/' + id)
  }
}
