import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@empresaurios/users';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS } from '../../order.constants';
import { Subject, take, takeUntil } from 'rxjs';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrdersService,
    private stripeService: StripeService,
  ) {}
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string;
  countries = [];
  unsubscribe$ : Subject<unknown> = new Subject();

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getCartIteams();
    this._getCountries();
  }

  ngOnDestroy(){
    
    this.unsubscribe$.complete();

  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _autoFillUserData() {
    this.usersService.observeCurrentUser().pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user) {
        this.userId=user.id;
        this.checkoutForm.name.setValue(user.name);
        this.checkoutForm.email.setValue(user.email);
        this.checkoutForm.phone.setValue(user.phone);
        this.checkoutForm.city.setValue(user.city);
        this.checkoutForm.country.setValue(user.country);
        this.checkoutForm.street.setValue(user.street);
        this.checkoutForm.apartment.setValue(user.apartment);
        this.checkoutForm.zip.setValue(user.zip);
      }
      
    })
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order:Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.apartment.value,
     zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: 0,
     
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.orderService.cacheOrderData(order);

    this.orderService.createCheckoutSession(this.orderItems).subscribe(error =>{
      if (error) {
        console.log('error en rediriguir el pago')
      }
    })

  }

  private _getCartIteams(){
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map(item => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    });

    console.log(this.orderItems)
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
