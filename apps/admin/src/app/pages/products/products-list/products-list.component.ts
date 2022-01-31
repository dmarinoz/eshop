import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@empresaurios/products';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products = []
  constructor(
    private productsService : ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe(products =>{
      this.products = products;
    })
  }

  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: '¿Quieres eliminar este producto?',
      header: 'Eliminar producto',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'El producto fue eliminado'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'El producto no fue eliminado'
            });
          }
        );
      }
    });
  }

}
