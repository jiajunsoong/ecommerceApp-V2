import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductInterface } from '../product-interface';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
export class ManageProductComponent implements OnInit {

  productList: MatTableDataSource<ProductInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductsService) {
    this.productList = new MatTableDataSource<ProductInterface>();
  }

  ngOnInit(): void {
    this.productService.getAllProductList().subscribe(
      (response: any) => {
        console.log(response);
        this.productList.data = response.products;
        console.log(this.productList.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    // After the view is initialized, set the paginator for the MatTableDataSource
    this.productList.paginator = this.paginator;
    this.productList.sort = this.sort; // For sort
  }

  applyFilter(filterValue: string) {
    // Convert the filter value to lowercase to make the search case-insensitive
    filterValue = filterValue.trim().toLowerCase();
    this.productList.filter = filterValue;
  }
  
  openAddProductDialog() {
    throw new Error('Method not implemented.');
  }
}
