import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@empresaurios/orders';
import { ProductsService } from '@empresaurios/products';
import { UsersService } from '@empresaurios/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  statistics = [];
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}
