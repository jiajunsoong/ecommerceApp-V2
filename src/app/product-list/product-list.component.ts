import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList:any =[];
  //set to any mean any type of data
  // productList: ProductInterface[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getAllProductList().subscribe(
      (productList: ProductInterface[]) => {
        //console.log is to check what response
        console.log(productList);
        this.productList = productList;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
