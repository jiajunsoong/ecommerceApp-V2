import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductInterface } from '../product-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls : ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  
  productDetail: ProductInterface | undefined;
  imagesList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.params['productId']);
    this.productService.getProductById(productId).subscribe(async (product) => {
      this.productDetail = product;
      const images = await this.productService.getAllImageListByProductId(productId).toPromise();
      this.imagesList = images || [];
    },
    error => {
      console.log(error)
    });
  }
}
