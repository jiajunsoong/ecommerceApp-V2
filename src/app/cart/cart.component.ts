import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit{
  cartItems = this.cartService.getItems();
  total: number = 0;

  constructor(private cartService: CartService) {
    this.calculateTotal();
  }
  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
    this.cartService.cartUpdated.subscribe(() => {
      this.cartItems = this.cartService.getItems();
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  updateQuantity(productId: number, newQuantity: number) {
    this.cartService.updateQuantity(productId, newQuantity);
    this.calculateTotal();
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
    this.calculateTotal();
  }
}
