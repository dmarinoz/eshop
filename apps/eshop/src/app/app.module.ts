import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@empresaurios/ui';
import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { CategoriesService, ProductsModule } from '@empresaurios/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { OrdersModule } from '@empresaurios/orders';
import { MessagesComponent } from './shared/messages/messages.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { JwtInterceptor, UsersModule } from '@empresaurios/users';
import { StoreModule,  } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';

const routes: Routes = [
  {
    path: '', 
    component: HomePageComponent
  },
  {
    path: 'products', 
    component: ProductListComponent
  },

]

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes), 
    HttpClientModule,
    UiModule, AccordionModule, 
    BrowserAnimationsModule,
    ProductsModule,
    UiModule,
    CheckboxModule,
    FormsModule,
    OrdersModule,
    ToastModule,
    UsersModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxStripeModule.forRoot('pk_test_51KN7adLZBDTpVsiOJSqLAKyCeZC68K1XLyPVkYEfqLihrFjzC8mqnMkIUh9fmRBdW7CH7h7kiphMePGE4jO8OU9h00xLhYwoQj')
  ],
  exports: [ProductListComponent, MessagesComponent],
    
  providers: [MessageService, CategoriesService, ConfirmationService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
