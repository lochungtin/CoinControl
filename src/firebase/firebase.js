import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrZcsDdY8kfByBt1u7YMSbsoSRXNmBUQ4",
  authDomain: "coincontrol-72bfc.firebaseapp.com",
  databaseURL: "https://coincontrol-72bfc-default-rtdb.firebaseio.com",
  projectId: "coincontrol-72bfc",
  storageBucket: "coincontrol-72bfc.appspot.com",
  messagingSenderId: "486441035059",
  appId: "1:486441035059:web:f58159b9152aab83268a46",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth, firebase };
