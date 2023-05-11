import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDZuE3hOkkuXtO_qYpeEFqgdUTX4HbN1Bw",
    authDomain: "ifbank-a2ebd.firebaseapp.com",
    projectId: "ifbank-a2ebd",
    storageBucket: "ifbank-a2ebd.appspot.com",
    messagingSenderId: "311277154930",
    appId: "1:311277154930:web:cb6d724572f926f4ffc8eb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };