import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { CardListComponent } from '../card-list/card-list.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { LoginComponent } from '../login/login.component';
import { RegesterComponent } from '../regester/regester.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CardListComponent,
    NotFoundComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegesterComponent,
    CartComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor() {}
}
