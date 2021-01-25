import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import { ToastController, IonSearchbar } from '@ionic/angular';
import { FirebaseProductService } from '../shared/services/firebase-product.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('searchBar', {static:false}) searchBar: IonSearchbar;
  products: Product[] = [];
  constructor(private productService: FirebaseProductService , private toastController: ToastController) {
    this.productService.getProducts().subscribe(data=>{
      this.products = data;
    });
  }

  async addToCart(item:Product){
    const toast = await this.toastController.create({
      message: item.name + ' added to cart',
      duration: 2000,
      position: 'top',
      color: 'secondary'
    });
    toast.present();
  }

  async addToFav(item: Product){
    const toast = await this.toastController.create({
      message: item.name + ' added to favourites',
      duration:2000,
      position: 'top',
      color: 'secondary'
    });
    toast.present();
  }

/*   search(event){
    const text = event.target.value;
    const allProducts = this.productService.getProducts();

    if(text && text.trim() !== ''){
      this.products = allProducts.filter(
        item=> item.name.toLowerCase().includes(text.toLowerCase())
      );
    } else{
      this.products = allProducts;
    }
  } */

  refresh(event){
    this.searchBar.value='';
    event.target.complete();
  }
}
