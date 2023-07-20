import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductInterface } from '../product-interface';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productDetail: ProductInterface | undefined;
  imagesList: string[] = [];
  activeSlideIndex: number = 0;
  slideshowInterval: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  addToCart(product: ProductInterface) {
    if (this.productDetail) {
      this.cartService.addToCart(this.productDetail);
      window.alert('Your product has been added to the cart!');
    }
    console.log(this.cartService.getItems());
  }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.params['productId']);
    this.productService.getProductById(productId).subscribe(async (product) => {
      this.productDetail = product;
      const images = await this.productService.getAllImageListByProductId(productId).toPromise();
      this.imagesList = images || [];
      console.log(this.imagesList);
    },
    error => {
      console.log(error);
    });

    // Start the slideshow
    this.startSlideshow();
  }

  startSlideshow(): void {
    this.slideshowInterval = setInterval(() => {
      this.activeSlideIndex = (this.activeSlideIndex + 1) % this.imagesList.length;
    }, 5000); // Change slide every 5 seconds
  }

  stopSlideshow(): void {
    clearInterval(this.slideshowInterval);
  }

  ngOnDestroy(): void {
    this.stopSlideshow();
  }

  goToNextSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.imagesList.length;
  }
  
  goToPreviousSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex - 1 + this.imagesList.length) % this.imagesList.length;
  }

}
