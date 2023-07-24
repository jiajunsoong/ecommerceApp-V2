import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductInterface } from '../product-interface';
import { ProductsService } from '../products.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { maxBy } from 'lodash';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
  
export class ManageProductComponent implements OnInit {

  productList: MatTableDataSource<ProductInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductsService, 
    public dialog: MatDialog) 
    {this.productList = new MatTableDataSource<ProductInterface>();}

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

  openAddProductDialog(): void {

    const maxIdProduct = maxBy(this.productList.data, 'id');
    const nextId = maxIdProduct ? maxIdProduct.id! + 1 : 1; // Increment the id by 1 or set it to 1 if the list is empty
    
    const newProduct: ProductInterface = {
      id: nextId,
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: '',
      category: '',
      thumbnail: '',
      images: [],
    };

    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '800px',
      data: newProduct,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // If the dialog was closed with valid data, add the new product
      if (result) {
        // Call your service method to create the product
        this.productService.createProduct(result).subscribe(
          (response) => {
            // Handle success
            console.log('Product created successfully:', response);
            window.alert('Product created successfully.');
            // Add the new product to the productList
            this.productList.data.push(result);
            // Refresh the MatTableDataSource after adding the new product
            this.productList.data = [...this.productList.data];
          },
          (error) => {
            // Handle error
            console.error('Error creating product:', error);
            console.log(result);
          }
        );
        console.log(result);
      }
    });
  }

  openEditProductDialog(product: ProductInterface): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '800px',
      data: product,
    });
  
    dialogRef.afterClosed().subscribe((result: ProductInterface | undefined) => {
      // If the dialog was closed with valid data, update the product
      if (result) {
        // Call your service method to update the product
        this.productService.updateProduct(result).subscribe(
          () => {
            // Handle success
            console.log('Product updated successfully.');
            // Find the index of the updated product in the productList
            const index = this.productList.data.findIndex(p => p.id === result.id);
            if (index !== -1) {
              // Update the product in the productList
              this.productList.data[index] = result;
              // Refresh the MatTableDataSource after updating the product
              this.productList.data = [...this.productList.data];
            }
          },
          (error) => {
            // Handle error
            console.error('Error updating product:', error);
          }
        );
      }
    });
  }

  deleteProduct(productId: number): void {
    // Call your service method to delete the product
    this.productService.deleteProduct(productId).subscribe(
      () => {
        // Handle success
        window.alert('Product deleted successfully.');
        console.log('Product deleted successfully.');
        // Remove the product from the productList
        this.productList.data = this.productList.data.filter(product => product.id !== productId);
      },
      (error) => {
        // Handle error
        window.alert('Error deleting product. Check the console for details.');
        console.error('Error deleting product:', error);
      }
    );
  }
  
}