import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CalculatePricePipe } from '../pipe/calculate-price.pipe';
import { ProductRequestServiceService } from '../services/product-request-service.service';
import { CartProductsService } from '../services/cart-products.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgFor, NgIf, CalculatePricePipe, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productDetails: any;
  cardData: any;
  max: any;
  counter: number = 1;
  fullStars: number[] = [];
  halfStar: boolean = false;
  emptyStars: number[] = [];
  selectedImage: string = '';
  index: number = 0;
  @Input() id: any;
  constructor(
    private ProductRequestService: ProductRequestServiceService,
    private cartData: CartProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ProductRequestService.getproductDetails(this.id).subscribe((res) => {
      this.productDetails = res;
      this.max = this.productDetails.stock;
      this.selectedImage = this.productDetails.images[this.index] || '';
      this.index++;
      this.updateStars();
    });
  }
  updateStars() {
    const fullStarCount = Math.floor(this.productDetails.rating);
    const hasHalfStar = this.productDetails.rating % 1 > 0;
    this.fullStars = Array(fullStarCount).fill(0);
    this.halfStar = hasHalfStar;
    this.emptyStars = Array(5 - fullStarCount - (hasHalfStar ? 1 : 0)).fill(0);
  }
  incProduct() {
    if (this.counter != this.max && this.productDetails.stock != 0) {
      this.productDetails.stock -= 1;
      this.counter += 1;
      if (this.productDetails.stock == 1) {
        this.productDetails.availabilityStatus = 'Out of Stock';
      }
    }
  }
  dicProduct() {
    if (this.counter! > 1) {
      this.productDetails.stock += 1;
      this.counter -= 1;
      if (this.productDetails.stock > 10) {
        this.productDetails.availabilityStatus = 'In Stock';
      } else if (this.productDetails.stock <= 10) {
        this.productDetails.availabilityStatus = 'Low Stock';
      }
    }
  }
  addToCart(id: number) {
    this.cartData.addProductToCart({
      id: id,
      counter: this.counter,
      max: this.max,
    });
    this.router.navigate(['/cart']);
  }
  selectedImages(image: any) {
    this.selectedImage = image;
  }
}
