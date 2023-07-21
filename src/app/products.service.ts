import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductInterface } from './product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  URL = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

  getAllProductList(): Observable<ProductInterface[]> {
    const productList = this.http.get<ProductInterface[]>(this.URL);
    console.log(productList);
    return productList;
    // console.log('Log', this.http.get<ProductInterface[]>(this.URL));
    // return this.http.get<ProductInterface[]>(this.URL);
  }

  getProductById(id: number): Observable<ProductInterface | undefined> {
    return this.http.get<ProductInterface>(`${this.URL}/${id}`);
  }

  getAllImageListByProductId(id: number): Observable<string[]> {
    return this.getProductById(id).pipe(
      map((ProductInterface: ProductInterface | undefined) => ProductInterface ? ProductInterface.images : [])
    );
  }

  createProduct(product: ProductInterface): Observable<any> {
    // Assuming the server API endpoint for creating a new product is '/products'
    return this.http.post<any>(this.URL, product);
  }
}
