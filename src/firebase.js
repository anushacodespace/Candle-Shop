import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "candle-shop-20caa.firebaseapp.com",
  databaseURL: "https://candle-shop-20caa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "candle-shop-20caa",
  storageBucket: "candle-shop-20caa.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
