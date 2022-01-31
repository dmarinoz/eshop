import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@empresaurios/orders';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
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
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: []
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: unknown;

  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService.getOrder(params.id).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  onStatusChange(event) {
    this.orderService.updateOrder({ status: event.value }, this.order.id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'La Orden fue actualizada'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Éxito',
          detail: 'La Orden fue actualizada'
        });
      }
    );
  }

  onCancel() {
    this.location.back();
  }
}
