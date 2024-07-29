import { Component } from '@angular/core';
import { CartProductsService } from '../services/cart-products.service';
import { ProductRequestServiceService } from '../services/product-request-service.service';
import { CalculatePricePipe } from '../pipe/calculate-price.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CalculatePricePipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  counter: number = 0;
  products: any;
  // max: any;
  cart: any;
  calcAllPrices: any[] = [];
  // filters: object[] = [];
  cartDetails: Array<{
    allData: any;
    controls: number;
    max: number;
  }> = [];
  constructor(
    private cartData: CartProductsService,
    private productsData: ProductRequestServiceService
  ) {}
  ngOnInit() {
    this.productsData.getProducts().subscribe((res) => {
      this.counter = this.cartData.getCartData().length;
      this.products = res.products;
      // this.max = this.products.stock;

      this.cartData.getCartData().forEach((item: any) => {
        console.log(item);
        this.cartDetails.push({
          allData: this.products.find((citem: any) => item.id == citem.id),
          controls: item.counter,
          max: item.max,
        });

        console.log(this.cartDetails);
        // console.log(
        //   this.cartDetails.filter((citem: any) => citem.id == item.id)
        // );
      });

      // this.cartDetails.filter(
      //   (citem: any) => citem.id == this.cart.find((e: any) => e.id)?.id
      // );

      // console.log(this.cartDetails);
    });
    this.cart = this.cartData.getCartData();
  }
  incProduct(dta: any) {
    if (dta.controls != dta.max && dta.allData.stock != 0) {
      dta.allData.stock -= 1;
      dta.controls += 1;
    }
  }
  dicProduct(dta: any) {
    if (dta.controls! > 1) {
      dta.allData.stock += 1;
      dta.controls -= 1;
    }
  }
  calcTotalPrice(dta: any, count: number) {
    return (dta * count).toFixed(2);
  }
  calcPrices() {
    let res: any = 0;
    document.querySelectorAll('.price').forEach((e) => {
      res = eval(`${res} + ${e.textContent}`);
    });
    return res.toFixed(2);
  }
  removeProduct(id: any) {
    this.cartData.removeProduct(id);
    this.cartDetails = this.cartDetails.filter((e: any) => e.allData.id != id);
  }
}
