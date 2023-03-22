import { Component, OnInit } from '@angular/core';
import { getApp } from '@firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  public products: any = [];
  public firebaseApp = getApp();
  public db = getFirestore(this.firebaseApp);
  public storage = getStorage();
  public showAddProductVariable = false;
  public showEditBtn = false;
  public id!: string;
  public updatedProduct!: any;
  public path!: any;
  public uploadPrecent!: any;
  public url!: any;
  public productID!: number;
  public showText: boolean = false;
  public showAdminPanel = false;
  public showPassIncorect = false;

  constructor() { }

  async ngOnInit() {
    this.get();
  }

  async login() {
    let passwordCheck;
    const q = query(collection(this.db, "users"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      const password: any = doc.data();
      passwordCheck = password.password;
    });
    if (passwordCheck === document.querySelector<any>('#input-password').value) {
      this.showAdminPanel = !this.showAdminPanel;
      this.showPassIncorect = false;
    } else {
      this.showPassIncorect = true;
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
  }

  showAddProduct() {
    this.showAddProductVariable = !this.showAddProductVariable;
    document.querySelector<any>('.btn-add').innerHTML = 'Add new';
  }

  resteForm() {
    document.querySelector<any>('.name-input').value = '';
    document.querySelector<any>('.weight-input').value = '';
    document.querySelector<any>('.title-input').value = '';
    document.querySelector<any>('.price-input').value = '';
    document.querySelector<any>('.oldPrice-input').value = '';
    document.querySelector<any>('.bgColor1-input').value = '';
    document.querySelector<any>('.bgColor2-input').value = '';
    document.querySelector<any>('.bgColor-input').value = '';
    document.querySelector<any>('.laneSale-checkbox').checked = false;
    document.querySelector<any>('.laneNew-checkbox').checked = false;
    document.querySelector<any>('.description-input').value = '';
    this.url = '';
    document.querySelector<any>('.path-input').value = '';
  }

  async addProduct() {
    this.showAddProductVariable = true;
    this.showEditBtn = false;
    const newDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const docRef = await addDoc(collection(this.db, "products"), {
      name: document.querySelector<any>('.name-input').value,
      weight: document.querySelector<any>('.weight-input').value,
      price: document.querySelector<any>('.price-input').value,
      oldPrice: document.querySelector<any>('.oldPrice-input').value,
      bcColorTop: document.querySelector<any>('.bgColor1-input').value,
      bcColorBottom: document.querySelector<any>('.bgColor2-input').value,
      bgColor: document.querySelector<any>('.bgColor-input').value,
      image: this.url,
      title: document.querySelector<any>('.title-input').value,
      laneSale: document.querySelector<any>('.laneSale-checkbox').checked,
      laneNew: document.querySelector<any>('.laneNew-checkbox').checked,
      added: `${newDate.getDate()} of ${monthNames[newDate.getMonth()]} ${newDate.getFullYear()}`,
      description: document.querySelector<any>('.description-input').value,
      path: document.querySelector<any>('.path-input').value,
      lowCalories: document.querySelector<any>('#low-calories').checked,
      zeroSugar: document.querySelector<any>('#zero-sugar').checked,
      allNatural: document.querySelector<any>('#all-natural').checked,
      category: document.querySelector<any>('#select').value
    });

    this.get();
    this.resteForm();
    this.showAddProduct();
  }

  async delete(id: any) {
    await deleteDoc(doc(this.db, 'products', id))
    this.get();
    this.deleteImg(id);
  }

  edit(id: any) {
    this.showAddProduct();

    document.querySelector<any>('.btn-add').innerHTML = 'Edit';
    this.showEditBtn = true;
    this.showAddProductVariable = true;

    setTimeout(() => {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          document.querySelector<any>('.name-input').value = this.products[i].name;
          document.querySelector<any>('.weight-input').value = this.products[i].weight;
          document.querySelector<any>('.price-input').value = this.products[i].price;
          document.querySelector<any>('.oldPrice-input').value = this.products[i].oldPrice;
          document.querySelector<any>('.bgColor1-input').value = this.products[i].bcColorTop;
          document.querySelector<any>('.bgColor2-input').value = this.products[i].bcColorBottom;
          document.querySelector<any>('.bgColor-input').value = this.products[i].bgColor;
          document.querySelector<any>('.laneSale-checkbox').checked = this.products[i].laneSale;
          document.querySelector<any>('.laneNew-checkbox').checked = this.products[i].laneNew;
          this.url = this.products[i].image;
          document.querySelector<any>('.description-input').value = this.products[i].description;
          document.querySelector<any>('.path-input').value = this.products[i].path;
          document.querySelector<any>('.title-input').value = this.products[i].title;
          document.querySelector<any>('#low-calories').checked = this.products[i].lowCalories;
          document.querySelector<any>('#zero-sugar').checked = this.products[i].zeroSugar;
          document.querySelector<any>('#all-natural').checked = this.products[i].allNatural;
          document.querySelector<any>('#select').value = this.products[i].category;
        }
      }
      this.id = id;
    }, 200);
  }

  async saveEdit() {
    const updatedProduct = {
      name: document.querySelector<any>('.name-input').value,
      weight: document.querySelector<any>('.weight-input').value,
      price: document.querySelector<any>('.price-input').value,
      oldPrice: document.querySelector<any>('.oldPrice-input').value,
      bcColorTop: document.querySelector<any>('.bgColor1-input').value,
      bcColorBottom: document.querySelector<any>('.bgColor2-input').value,
      bgColor: document.querySelector<any>('.bgColor-input').value,
      image: this.url,
      laneSale: document.querySelector<any>('.laneSale-checkbox').checked,
      laneNew: document.querySelector<any>('.laneNew-checkbox').checked,
      description: document.querySelector<any>('.description-input').value,
      title: document.querySelector<any>('.title-input').value,
      path: document.querySelector<any>('.path-input').value,
      lowCalories: document.querySelector<any>('#low-calories').checked,
      zeroSugar: document.querySelector<any>('#zero-sugar').checked,
      allNatural: document.querySelector<any>('#all-natural').checked,
      category: document.querySelector<any>('#select').value
    }
    const productRef = doc(this.db, "products", this.id);
    await updateDoc(productRef, updatedProduct);
    this.get();
    this.resteForm();
    this.showAddProductVariable = !this.showAddProductVariable;
    document.querySelector<any>('.btn-add').innerHTML = 'Add new';
  }

  upload($event: any) {
    this.path = $event.target.files[0];
    this.uploadFile('images', this.path.name, this.path)
      .then((data: any) => {
        console.log(data);
      })
      .catch((e: any) => {
        console.error(e);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null) {
    const path = `${folder}/${name}`;

    if (file) {
      try {
        const stroageRef = ref(this.storage, path);
        const task = uploadBytesResumable(stroageRef, file);
        await task;
        this.url = await getDownloadURL(stroageRef);
      }
      catch (e: any) {
        console.log(e);

      }
    } else {
      console.log('wrong format');
    }
    this.showText = !this.showText
    return Promise.resolve(this.url);
  }

  deleteImg(id: any) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        const task = ref(this.storage, this.products[i].image);
        deleteObject(task).then(() => {
          this.showText = false;
        })
      }
    }
  }
}
