import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import {Plugins, CameraResultType, CameraSource} from '@capacitor/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { FirebaseProductService } from '../shared/services/firebase-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  addProductForm: FormGroup;
  categories: string[];
  submitted: boolean = false;
  photo:SafeResourceUrl;

  static positiveNumber (fc: FormControl){
    if (fc.value <= 0){
      return ({positiveNumber: true});
    } else{
      return (null);
    }
  }

  constructor(private router:Router, private productService: FirebaseProductService, private sanitizer:DomSanitizer) { 
    this.categories = ['Main', 'Beverages', 'Dessert'];
    this.addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [AddProductPage.positiveNumber]),
      category: new FormControl('Main'),
      vegetarian: new FormControl(true)
    });
  }

  ngOnInit() {
  }
  add(){
    this.submitted = true;

    if(this.addProductForm.valid){
      const prod = new Product(
        this.addProductForm.value.name,
        this.addProductForm.value.price,
        this.photo,
        this.addProductForm.value.name); //use name as ID
      prod.category = this.addProductForm.value.category;
      prod.vegetarian = this.addProductForm.value.vegetarian;
      this.productService.add(prod);
      this.router.navigate(['tabs/tab2']);
    }
  }

  async takePhoto(){
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType:CameraResultType.DataUrl,
      source:CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }
}
