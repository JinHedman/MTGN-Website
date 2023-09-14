import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCcjn5vHPUuz7IPL6C8IH_qLBch4UyMGzQ",
    authDomain: "mottagningen-7063b.firebaseapp.com",
    databaseURL: "https://mottagningen-7063b.firebaseio.com",
    projectId: "mottagningen-7063b",
    storageBucket: "mottagningen-7063b.appspot.com",
    messagingSenderId: "427934715398",
    appId: "1:427934715398:web:99c3e22e93a964ad273d87"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
