import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartProductsService {
  private cartData: Array<{
    id: number;
    counter: number;
    max: number;
  }> = [];
  constructor() {}
  getCartData(): any {
    return this.cartData;
  }
  addProductToCart(product: any): void {
    // console.log(product.id);
    // console.log(this.cartData);
    if (this.cartData.find((e: any) => e.id == product.id)) {
      this.cartData.find((item) => {
        if (item.id === product.id) {
          // item.counter = 1;
          item.counter = product.counter;
          item.max = product.max;
        }
      });
    } else {
      // console.log(product);

      this.cartData.push(product);
      // console.log(this.cartData);
    }
  }
  removeProduct(productid: any) {
    // console.log(product);

    this.cartData = this.cartData.filter((item) => item.id !== productid);
    // item.counter != product.counter;
    // item.max != product.max;
    // return this.cartData;
  }
}
