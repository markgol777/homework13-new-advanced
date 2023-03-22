// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyC0ImzgvgFv6nOdFQIYSIv4yqqZ4TaI7hY",
    authDomain: "petro-shop.firebaseapp.com",
    projectId: "petro-shop",
    storageBucket: "petro-shop.appspot.com",
    messagingSenderId: "614552666681",
    appId: "1:614552666681:web:54cd1fea01541b234b43e8",
    measurementId: "G-JQG55YD6DC"
  }
};

export const app = initializeApp(environment.firebase);
export const auth = getAuth(app)

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
