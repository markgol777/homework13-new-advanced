import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CookiePageComponent } from './cookie-page/cookie-page.component';
import { CandiesPageComponent } from './candies-page/candies-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AboutProductComponent } from './about-product/about-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from "firebase/app";
import { provideStorage, getStorage } from '@angular/fire/storage';
import { LoaderComponent } from './loader/loader.component';
import { AngularFireModule } from '@angular/fire/compat';

const firebase = {
  apiKey: "AIzaSyC0ImzgvgFv6nOdFQIYSIv4yqqZ4TaI7hY",
  authDomain: "petro-shop.firebaseapp.com",
  projectId: "petro-shop",
  storageBucket: "petro-shop.appspot.com",
  messagingSenderId: "614552666681",
  appId: "1:614552666681:web:54cd1fea01541b234b43e8",
  measurementId: "G-JQG55YD6DC"
}

const app = initializeApp(firebase);

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CookiePageComponent,
    CandiesPageComponent,
    AdminPanelComponent,
    AboutProductComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebase),
    provideFirebaseApp(() => app),
    provideStorage(() => getStorage())
    
  ],
  providers: [CookiePageComponent, AboutProductComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }