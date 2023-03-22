import { Component, OnInit } from '@angular/core';
import { getApp } from '@firebase/app';
import { getFirestore, collection, getDocs, query } from "firebase/firestore";

@Component({
  selector: 'app-cookie-page',
  templateUrl: './cookie-page.component.html',
  styleUrls: ['./cookie-page.component.scss']
})
export class CookiePageComponent implements OnInit {

  public products: any = [];
  public firebaseApp = getApp();
  public db = getFirestore(this.firebaseApp);
  public currentProduct!: any;

  constructor() { }

  async ngOnInit() {
    await this.get();
    setTimeout(() => {
      this.hideLoader();
    }, 200);
    console.log(this.products);
  }

  hideLoader() {
    document.querySelector<any>('.loader').classList.add('loader--hidden');
  }

  async get() {
    const products: any = [];
    const q = query(collection(this.db, "products"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const product: any = doc.data();
      console.log(product);
      if (product.category == 'cookie') {
        product.id = doc.id;
        products.push(product);
      }
    });
    this.products = products;
  }
}
