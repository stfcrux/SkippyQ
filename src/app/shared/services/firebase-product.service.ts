import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class FirebaseProductService {
  private productsRef = firebase.firestore().collection("products");
  constructor() { }

  getProducts(): Observable<any>{
    return new Observable ((observer)=>{
      this.productsRef.onSnapshot((querySnapshot) =>{
        let products = [];
        querySnapshot.forEach((doc) =>{
          let data = doc.data();
          let p = new Product(data.name, data.price, data.image, doc.id);
          if(data.category) p.category = data.category;
          if(data.vegetarian) p.vegetarian = data.vegetarian;

          if(data.image){
            p.imagePath = data.image;
            const imageRef = firebase.storage().ref().child(data.image);
            imageRef.getDownloadURL()
              .then(url=> {
                p.image = url;
              }).catch(error=>{
                console.log('Error: Read image fail '+ error);
              });
          }

          products.push(p);
        });
        observer.next(products);
      });
    });
  }

  getProductById(id: string): Observable<any>{
    return new Observable((observer)=>{
      this.productsRef.doc(id).get().then((doc)=>{
        let data = doc.data();
        let p = new Product(data.name, data.price, data.image, doc.id);
        if (data.category) p.category = data.category;
        if (data.vegetarian) p.vegetarian = data.vegetarian;

        if(data.image){
          p.imagePath = data.image;
          const imageRef = firebase.storage().ref().child(data.image);
          imageRef.getDownloadURL()
            .then(url =>{
              p.image = url;
              observer.next(p);
              console.log('Image is ' +p.image);
            }).catch (error=>{
              console.log('Error: Read image fail '+ error);
            });
        }

        observer.next(p);
      });
    });
  }

  delete(p:Product){
    const ref = this.productsRef.doc(p.id);
    ref.get().then(doc=>{
      if (doc.exists)
        ref.delete();
    })
  }

  update(p:Product){
    const ref = this.productsRef.doc(p.id);
    ref.update({
      name: p.name,
      price: p.price,
    });
    if(p.category != undefined)
      ref.update({
        category:p.category
      });
    if(p.vegetarian != undefined)
      ref.update({
        vegetarian:p.vegetarian
      });

  }

  add(p:Product){
    this.productsRef.add({
      name:p.name,
      price: p.price,
      category: p.category,
      vegetarian: p.vegetarian
    }).then(doc=>{
      if(p.image){
        const dataUrl = p.image.changingThisBreaksApplicationSecurity;
        const imageRef = firebase.storage().ref().child(doc.id);
        imageRef.putString(dataUrl,
          firebase.storage.StringFormat.DATA_URL).then(()=>{
            const ref = this.productsRef.doc(doc.id);
            ref.update({image: doc.id});
          });
      }
    });
  }
}
