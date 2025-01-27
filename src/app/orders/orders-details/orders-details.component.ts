import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from '../../shared/Models/order';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-details.component.html',
  styleUrl: './orders-details.component.scss'
})
export class OrdersDetailsComponent implements OnInit {

  order: IOrder;

  constructor(private ordersService: OrdersService, private breadCrumbService: BreadcrumbService, private router: ActivatedRoute) {
    this.breadCrumbService.set('@OrderDetails', '');
  }

  ngOnInit(): void {
    const id = +this.router.snapshot.paramMap.get('id');
    this.ordersService.getOrderDetails(id).subscribe({
      next: ((order: IOrder) => {
        this.order = order;
        this.breadCrumbService.set('@OrderDetails', `Order ${order.id} - ${order.orderStatus}`)
      }),
      error: ((err) => { console.error(err.message) })
    })
  }
}
