import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5NSmQ0pN8Nf7k3GwBXxu73DePPJ4w9Do",
    authDomain: "newshantika-7526d.firebaseapp.com",
    projectId: "newshantika-7526d",
    storageBucket: "newshantika-7526d.appspot.com",
    messagingSenderId: "535813158229",
    appId: "1:535813158229:web:37f634c8a570beb374abdc"
  };

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Dapatkan instance Firestore
export const db = getFirestore(app);
