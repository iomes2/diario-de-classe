// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importa o módulo de autenticação
import { getFirestore } from "firebase/firestore"; // Importa o módulo Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXzpNRTTIcPfrRquPYgESeV9uodOc7xLw",
  authDomain: "diario-de-classe-5008b.firebaseapp.com",
  projectId: "diario-de-classe-5008b",
  storageBucket: "diario-de-classe-5008b.firebasestorage.app",
  messagingSenderId: "247361357417",
  appId: "1:247361357417:web:87298c51cc37a58538c4f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app); // Inicializa e exporta a autenticação
export const db = getFirestore(app); // Inicializa e exporta o Firestore
