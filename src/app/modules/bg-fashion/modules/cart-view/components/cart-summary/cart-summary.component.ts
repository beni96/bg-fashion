import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  @Input() name: string;
  @Input() email: string;
  @Input() address: string;
  @Input() totalItems: number;
  @Input() totalPrice: number;

  summaryLines: { title: string; value: string | number }[] = [];

  ngOnInit() {
    this.summaryLines = [
      { title: 'Name', value: this.name },
      { title: 'Email', value: this.email },
      { title: 'Address', value: this.address },
      { title: 'Total Items', value: this.totalItems },
      { title: 'Total Price', value: this.totalPrice },
    ];
  }
}
