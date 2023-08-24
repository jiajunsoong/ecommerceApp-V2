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
  
  selectedCategory: any = ''; // Track the selected category
  categories: any[] = [
    {value: '', viewValue: 'All'},
    {value: 'smartphones', viewValue: 'Smartphones'},
    {value: 'laptops', viewValue: 'Laptops'},
    {value: 'fragrances', viewValue: 'Fragrances'},
    {value: 'skincare', viewValue: 'Skincare'},
    {value: 'groceries', viewValue: 'Groceries'},
    {value: 'home-decoration', viewValue: 'Home-Decoration'},
  ];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getAllProductList().subscribe(
      (productList: ProductInterface[]) => {
        console.log(productList);
        this.productList = productList;
  
        if (Array.isArray(productList)) {
          this.categories = Array.from(new Set(productList.map(product => product.category)));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}