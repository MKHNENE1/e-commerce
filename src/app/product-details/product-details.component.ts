import { Component, Input } from '@angular/core';
// import * as productData from '../products Data/products.json';
import { ProductData } from '../interface/product-data';
import { NgFor, NgIf } from '@angular/common';
import { CalculatePricePipe } from '../pipe/calculate-price.pipe';
import { ProductRequestServiceService } from '../services/product-request-service.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgFor, NgIf, CalculatePricePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  constructor(private ProductRequestService: ProductRequestServiceService) {}
  // jsonData: Array<ProductData> = (productData as any).default;
  productDetails: any;
  cardData: any;
  fullStars: number[] = [];
  halfStar: boolean = false;
  emptyStars: number[] = [];
  @Input() id: any;
  ngOnInit() {
    this.ProductRequestService.getproductDetails(this.id).subscribe((res) => {
      this.productDetails = res;
      this.updateStars();
      console.log(this.productDetails);
    });
  }
  updateStars() {
    const fullStarCount = Math.floor(this.productDetails.rating);
    const hasHalfStar = this.productDetails.rating % 1 > 0;
    this.fullStars = Array(fullStarCount).fill(0);
    this.halfStar = hasHalfStar;
    this.emptyStars = Array(5 - fullStarCount - (hasHalfStar ? 1 : 0)).fill(0);
  }
}
