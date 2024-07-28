import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalculatePricePipe } from '../pipe/calculate-price.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, NgIf, CalculatePricePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() cardData: any;
  fullStars: number[] = [];
  halfStar: boolean = false;
  emptyStars: number[] = [];
  ngOnInit() {
    this.updateStars();
  }
  updateStars() {
    const fullStarCount = Math.floor(this.cardData.rating);
    const hasHalfStar = this.cardData.rating % 1 > 0;
    this.fullStars = Array(fullStarCount).fill(0);
    this.halfStar = hasHalfStar;
    this.emptyStars = Array(5 - fullStarCount - (hasHalfStar ? 1 : 0)).fill(0);
  }
}
