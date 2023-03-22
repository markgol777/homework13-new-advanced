import { Component, OnInit } from '@angular/core';
import { getApp } from '@firebase/app';
import { getFirestore, collection, getDocs, query } from "firebase/firestore";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public products: any = [];
  public firebaseApp = getApp();
  public db = getFirestore(this.firebaseApp);
  public currentProduct!: any;

  constructor() { }

  async ngOnInit() {
    setTimeout(() => {
      this.hideLoader();
    }, 200);
  }

  hideLoader() {
    document.querySelector<any>('.loader').classList.add('loader--hidden');
  }

  mouseOver() {
    document.querySelector<any>('.buy-btn').style.animation = 'animationTest1 0.4s 1';
    setTimeout(() => {
      document.querySelector<any>('.buy-btn').style.opacity = 1;
    }, 400);
  }

  mouseLeave() {
    document.querySelector<any>('.buy-btn').style.animation = 'animationTest2 0.4s 1';
    setTimeout(() => {
      document.querySelector<any>('.buy-btn').style.opacity = 0;
    }, 400);
  }


  mouseEnter(e: any) {
    document.querySelector<any>('.cursor').style.left = e.pageX + 'px';
    document.querySelector<any>('.cursor').style.top = e.pageY + 'px';
  }


}
