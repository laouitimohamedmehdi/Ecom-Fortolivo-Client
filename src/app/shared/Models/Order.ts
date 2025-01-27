import { IAddress } from "./Address";

export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipAddress: IAddress;
  }

  export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: string;
    shipAddress: IAddress;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: IOrderItem[];
    subTotal: number;
    total: number;
    orderStatus: number;
  }
  
  export interface IOrderItem {
    productItemId: number;
    productItemName: string;
    productUrl: string;
    price: number;
    quantity: number;
  }