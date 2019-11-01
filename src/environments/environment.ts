// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: 'AIzaSyChoYXaTulBV02_UIH6NhNDGLJe7X3zANM',
  authDomain: 'blog-60969.firebaseapp.com',
  databaseURL: 'https://blog-60969.firebaseio.com',
  projectId: 'blog-60969',
  storageBucket: 'blog-60969.appspot.com',
  messagingSenderId: '617242861692',
  appId: '1:617242861692:web:66507bf42af5dbe8'
};

export const environment = {
  production: false,
  firebase: firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
