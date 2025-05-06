// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHaYUTZ2dxx9ePvF37O2fcOqRG10-49Mg",
  authDomain: "edu-connect-3b031.firebaseapp.com",
  projectId: "edu-connect-3b031",
  storageBucket: "edu-connect-3b031.appspot.com", // düzeltildi
  messagingSenderId: "1045713974628",
  appId: "1:1045713974628:web:30777e1612e399d9b97671"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
