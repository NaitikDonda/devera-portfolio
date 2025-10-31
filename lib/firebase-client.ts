import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCoOwvcbzXCfznjfegK7lzRn-XyzYovBkM",
  authDomain: "serenityspace-83b35.firebaseapp.com",
  projectId: "serenityspace-83b35",
  storageBucket: "serenityspace-83b35.firebasestorage.app",
  messagingSenderId: "202263016311",
  appId: "1:202263016311:web:82d2fe3e33dc8214fce772",
  measurementId: "G-VKS6LCC0NS"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
