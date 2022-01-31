import { ApplicationModule, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { OrdersModule } from '@empresaurios/orders';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {RatingModule} from 'primeng/rating';


const routes: Routes = [
  {
    path: 'category/:categoryid', 
    component: ProductsListComponent
  },
  {
    path: 'products/:productid', 
    component: ProductPageComponent
  }
]
@NgModule({
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductsComponent,
      ProductPageComponent,
      
    ],
    imports: [CommonModule, OrdersModule, RouterModule,  ButtonModule, RouterModule.forRoot(routes), CheckboxModule,
      FormsModule,  HttpClientModule, InputNumberModule, RatingModule],
    exports:[ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductPageComponent]
})
export class ProductsModule {}
