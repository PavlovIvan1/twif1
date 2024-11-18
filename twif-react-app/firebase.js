import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"


const firebaseConfig = {
  apiKey: "AIzaSyBaKFeqmlsX8n9lqfUsTO9tXkqmCAcxJ14",
  authDomain: "twif6-fce84.firebaseapp.com",
  projectId: "twif6-fce84",
  storageBucket: "twif6-fce84.appspot.com",
  messagingSenderId: "545377282245",
  appId: "1:545377282245:web:e146d23214e2c3bdcc68ac",
  measurementId: "G-RGQMS7FM0K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);