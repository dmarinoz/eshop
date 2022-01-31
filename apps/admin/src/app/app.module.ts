import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';


import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesTableComponent } from './categories/categories-table/categories-table.component';
import {CardModule} from 'primeng/card'; 
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { CategoriesService } from '@empresaurios/products';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import {FieldsetModule} from 'primeng/fieldset';
import { AuthGuard, UsersModule } from '@empresaurios/users';
import { StoreModule,  } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';


const UX_MODULE = [
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    EditorModule,
    DropdownModule,
    TagModule,
    InputMaskModule,
    FieldsetModule
]
const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
            },
            {
                path: 'categories',
                component: CategoriesTableComponent,
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent,
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent,
            },
            {
                path: 'products',
                component: ProductsListComponent,
            },
            {
                path: 'products/form',
                component: ProductsFormComponent,
            },
            {
                path: 'products/form/:id',
                component: ProductsFormComponent,
            },
            {
                path: 'users',
                component: UserListComponent,
            },
            {
                path: 'users/form',
                component: UsersFormComponent,
            },
            {
                path: 'users/form/:id',
                component: UsersFormComponent,
            },
            {
                path: 'orders',
                component: OrdersListComponent,
            },
            {
                path: 'orders/:id',
                component: OrdersDetailComponent,
            },




        ]
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];


@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesTableComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UserListComponent, UsersFormComponent, OrdersListComponent, OrdersDetailComponent],
    imports: [
        BrowserModule, 
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
        UsersModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgxStripeModule.forRoot('pk_test_51KN7adLZBDTpVsiOJSqLAKyCeZC68K1XLyPVkYEfqLihrFjzC8mqnMkIUh9fmRBdW7CH7h7kiphMePGE4jO8OU9h00xLhYwoQj'),
        ...UX_MODULE
    ],
    providers: [CategoriesService, MessageService, ConfirmationService, InputNumberModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
