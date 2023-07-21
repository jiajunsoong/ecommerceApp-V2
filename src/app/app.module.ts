import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { AppRoutingModule } from './app-routing.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AddProductDialogComponent } from './manage-product/add-product-dialog/add-product-dialog.component';

import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailComponent,
    CartComponent,
    FilterPipe,
    TopBarComponent,
    ManageProductComponent,
    LoginComponent,
    RegisterComponent,
    AddProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // RouterModule.forRoot([
    //   { path: '', component: ProductListComponent },
    //   { path: 'cart', component: CartComponent },
    //   { path: 'manage-product', component: ManageProductComponent, canActivate: [AuthGuard] },
    //   { path: 'products/:productId', component: ProductDetailComponent},
    // ]),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule, 
    NgFor, 
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
