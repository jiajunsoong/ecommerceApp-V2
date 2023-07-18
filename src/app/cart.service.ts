import { ProductInterface } from './product-interface';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: { product: ProductInterface; quantity: number }[] = [];
  cartUpdated: EventEmitter<void> = new EventEmitter<void>();

  addToCart(product: ProductInterface) {
    const existingItem = this.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product: product, quantity: 1 });
    }
  }

  getItems() {
    return this.items;
  }

  updateQuantity(productId: number, quantity: number) {
    const itemToUpdate = this.items.find((item) => item.product.id === productId);
    if (itemToUpdate) {
      itemToUpdate.quantity = quantity;
    }
  }

  removeItem(productId: number) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.cartUpdated.emit(); // Notify CartComponent that cart items have been updated
    window.alert('Item removed from cart');
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>('/assets/shipping.json');
  }

  constructor(private http: HttpClient) {}
}
