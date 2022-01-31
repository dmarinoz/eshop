import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetailed, OrdersService } from '@empresaurios/orders';
import { Subject, takeUntil } from 'rxjs';
import { CartItem } from '../../models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemsDetailed : CartItemDetailed[] = []
  cartCount = 0;
  endSubs$ : Subject<unknown> = new Subject();
  constructor(private router: Router, private cartService: CartService, private orderService: OrdersService) { }

  ngOnInit(): void {
    this._getCartDetails()
  }

  ngOnDestroy(){
    
    this.endSubs$.complete();
  }

  private _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(respCart =>{
      this.cartItemsDetailed = [];
      this.cartCount = respCart?.items.length ?? 0;
      respCart.items.forEach((cartItem) =>{
        this.orderService.getProduct(cartItem.productId).subscribe(respProduct =>{
          this.cartItemsDetailed.push({
            product: respProduct,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }

  backToShop() {
    this.router.navigate(['/products'])
  }

  deleteCartItem(cartItem: CartItemDetailed){
    this.cartService.deleteCartItem(cartItem.product.id)
  }

  updateCartItemQuantity(event, cartItem: CartItemDetailed){
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true)
  }

}
