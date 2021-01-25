import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  constructor() { 
    this.products = [
      new Product('Coffee', 5.9, 'assets/coffee.jpg', '1'),
      new Product('Rainbow Shake', 7.2, 'assets/rainbow.jpg', '2'),
      new Product('Taco', 4.5, 'assets/taco.jpg', '3'),
      new Product('Sandwich', 6.5, 'assets/sandwich.jpg', '4'),
      new Product('Burger', 6.5, 'assets/burger.jpg', '5'),
    ];
  }

  getProducts(): Product[]{
    return this.products;
  }

  add(p:Product){
    this.products.push(p);
  }
  
  update(p:Product){
    const index = this.products.findIndex(item=> item.id == p.id);
    if (index >=0){
      const prod = this.products[index];
      prod.name= p.name;
      prod.price = p.price;
      prod.category = p.category;
      prod.vegetarian = p.vegetarian;
    }
  }

  delete(p:Product){
    const index = this.products.findIndex(item => item.id == p.id);
    if (index>= 0){
      this.products.splice(index, 1);
    }
  }

  getProductByID(id:string): Product{
    return this.products.find(item => item.id == id);
  }
}
