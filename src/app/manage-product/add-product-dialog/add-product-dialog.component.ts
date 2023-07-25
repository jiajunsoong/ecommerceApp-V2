import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductInterface } from '../../product-interface';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css'],
})

export class AddProductDialogComponent {
  selectedImages: File []=[]; // to store the selected file

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductInterface
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onImagesSelected(event: any) {
    const files: FileList = event.target.files;
    // Convert FileList to an array and assign it to selectedImages
    this.selectedImages = Array.from(files);
  }
}