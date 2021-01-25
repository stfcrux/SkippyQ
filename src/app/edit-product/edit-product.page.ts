import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseProductService } from '../shared/services/firebase-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  productId: string;
  product: Product;
  productImage: string;
  categories: string[];
  submitted: boolean=false;

  static positiveNumber (fc: FormControl){
    if (fc.value <= 0){
      return ({positiveNumber: true});
    } else{
      return (null);
    }
  }

  editProductForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private productService: FirebaseProductService) { 
    this.categories = ['Main', 'Beverages', 'Dessert'];
    if(this.product == undefined){
      this.product = new Product('', 0, '');
    }
    this.productId = this.route.snapshot.params.id;

    this.editProductForm = new FormGroup({
      name: new FormControl(this.product.name, Validators.required),
      price: new FormControl(this.product.price, EditProductPage.positiveNumber),
      category: new FormControl(this.product.category),
      vegetarian: new FormControl(this.product.vegetarian)
    });

    this.productService.getProductById(this.productId)
      .subscribe(data=>{
        this.product = data;
        if(this.product){
          this.productImage = this.product.image;
          this.editProductForm.controls.name.setValue(this.product.name);
          this.editProductForm.controls.price.setValue(this.product.price);
          this.editProductForm.controls.category.setValue(this.product.category);
          this.editProductForm.controls.vegetarian.setValue(this.product.vegetarian);
        }
      });
  }

  ngOnInit() {
  }
  update(){
    this.submitted = true;
    if (this.editProductForm.valid){
      const prod = new Product(
        this.editProductForm.value.name,
        this.editProductForm.value.price,
        undefined,
        this.productId
      );
      prod.category = this.editProductForm.value.category;
      prod.vegetarian = this.editProductForm.value.vegetarian;
      this.productService.update(prod);
      this.router.navigate(['tabs/tab2']);
    }
  }

}
