import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@empresaurios/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
//import { ORDER_STATUS } from '../order.constants';

const ORDER_STATUS = {
  0 : {
    label: 'Pendiente',
    color: 'primary'
  },
  1 : {
    label: 'Procesada',
    color: 'warning'
  },
  2 : {
    label: 'Enviada',
    color: 'success'
  },
  3 : {
    label: 'Fallida',
    color: 'danger'
  }

}

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: []
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: '¿Quiere borrar esta orden?',
      header: 'Eliminar Orden',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'La Orden fue eliminada'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'La Orden no fue eliminada'
            });
          }
        );
      }
    });
  }
}