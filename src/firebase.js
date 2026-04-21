
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyChadvfh8Bi6d1ygy79tohh2G9_TT-hf4Y",
    authDomain: "minha-loja-c8e0d.firebaseapp.com",
    projectId: "minha-loja-c8e0d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);