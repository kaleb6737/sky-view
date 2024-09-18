// src/firebase.d.ts
declare module '../firebase.ts' {
    import { FirebaseApp } from 'firebase/app';
    import { Auth } from 'firebase/auth';
  
    export const app: FirebaseApp;
    export const auth: Auth;
  }


