import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CalculatePricePipe } from '../pipe/calculate-price.pipe';
import { ProductData } from '../interface/product-data';
import { ProductRequestServiceService } from '../services/product-request-service.service';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent, CalculatePricePipe],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent {
  products: any;
  constructor(private productRequestService: ProductRequestServiceService) {}

  ngOnInit() {
    this.productRequestService
      .getProducts()
      .subscribe((res) => (this.products = res.products));
  }
}
