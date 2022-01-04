import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyB92KpT5q8TuUyBTKXgIUDSkUNWuqgT4Tc",
    authDomain: "netflix-9f023.firebaseapp.com",
    projectId: "netflix-9f023",
    storageBucket: "netflix-9f023.appspot.com",
    messagingSenderId: "402902573290",
    appId: "1:402902573290:web:e7d89525f237b0edcd3793",
    measurementId: "${config.measurementId}"
  };
  const app = initializeApp(firebaseConfig);
    const storage =app.storage;
  export default storage;