import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(products: any[], selectedCategory: string): any[] {
    if (!selectedCategory || selectedCategory === 'All') {
      return products;
    } else {
      return products.filter(product => product.category === selectedCategory);
    }
  }
}
