import { Component, Input } from '@angular/core';
import { ProductInterface } from '../product-interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  
})
export class ProductComponent {
  
  @Input() product!: ProductInterface;
  
}
