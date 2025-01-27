import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/Models/Basket';
import { IProducts } from '../shared/Models/Products';
import { IDeliveryMethod } from '../shared/Models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseURl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping: number = 0;

  constructor(private http: HttpClient) { }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductToBasket(item: IProducts, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      productPicture: item.productPicture,
      price: item.price,
      quantity: quantity,
      category: item.categoryName
    }
  }

  private calculateTotal() {
    const basket = this.getCurrentBasket();
    const shipping = this.shipping;
    const subtotal = basket.basketItems.reduce((a, c) => { return (c.price * c.quantity) + a; }, 0)
    const total = subtotal + shipping;
    this.basketTotalSource.next({ shipping, subtotal, total });
  }

  private addOrUpdate(basketItems: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = basketItems.findIndex(i => i.id == itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      basketItems.push(itemToAdd);
    }
    else {
      basketItems[index].quantity += quantity;
    }
    return basketItems;
  }

  incrmentBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasket();
    const itemBasket = basket.basketItems.findIndex(x => x.id === item.id)
    basket.basketItems[itemBasket].quantity++;
    this.setBasket(basket);
  }

  decrmentBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasket();
    const itemBasket = basket.basketItems.findIndex(x => x.id === item.id)

    if (basket.basketItems[itemBasket].quantity > 1) {
      basket.basketItems[itemBasket].quantity--;
      this.setBasket(basket);
    }
    else {
      this.removeItemBasket(item);
    }
  }

  removeItemBasket(item: IBasketItem) {
    const basket = this.getCurrentBasket();
    if (basket.basketItems.some(x => x.id === item.id)) {
      basket.basketItems = basket.basketItems.filter(x => x.id !== item.id);
      if (basket.basketItems.length > 0) {
        this.setBasket(basket);
      }
      else {
        this.deleteBasket(basket);
      }
    }

  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseURl + 'Basket/delete-basket/' + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  getBasket(id: string) {
    return this.http.get(this.baseURl + 'Basket/get-basket-item/' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket)
          this.calculateTotal();
        })
      )
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseURl + 'Basket/update-basket', basket).subscribe({
      next: (res: IBasket) => {
        this.basketSource.next(res);
        this.calculateTotal();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getCurrentBasket() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProducts, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.mapProductToBasket(item, quantity);
    const basket: IBasket = this.getCurrentBasket() ?? this.createBasket();
    basket.basketItems = this.addOrUpdate(basket.basketItems, itemToAdd, quantity);
    return this.setBasket(basket);
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.calculateTotal();
  }

}
