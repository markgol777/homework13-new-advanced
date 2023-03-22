import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.scss'],
})
export class AboutProductComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  public firebaseApp = getApp();
  public db = getFirestore(this.firebaseApp);
  public products!: any;
  public product!: any;
  public color1!: any;
  public background!: any;

  async ngOnInit() {
    await this.loadProduct();
    setTimeout(() => {
      this.hideLoader();
    }, 200);
    this.background = `linear-gradient(to bottom, ${this.product.bcColorTop} 0%,${this.product.bcColorTop} 50%,${this.product.bcColorBottom} 50%, ${this.product.bcColorBottom} 100%)`;
  }

  hideLoader() {
    document.querySelector<any>('.loader').classList.add('loader--hidden');
  }

  async loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    await this.get();
    console.log(this.products)
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        console.log(this.products[i]);
        this.product = this.products[i];
        this.color1 = this.products[i].bcColorTop;
      }
    }
  }

  async get() {
    const products: any = [];
    const q = query(collection(this.db, "products"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const user: any = doc.data();
      user.id = doc.id;
      products.push(user);
    });
    this.products = products;
    console.log(this.products);
  }

}
