import firebase from "firebase";

import { LogBox } from 'react-native';
import { apiKey } from "../data/secrets";

LogBox.ignoreLogs(['Setting a timer']);

let firebaseConfig: any = {
    apiKey,
    authDomain: "coincontrol-72bfc.firebaseapp.com",
    databaseURL: "https://coincontrol-72bfc-default-rtdb.firebaseio.com",
    projectId: "coincontrol-72bfc",
    storageBucket: "coincontrol-72bfc.appspot.com",
    messagingSenderId: "486441035059",
    appId: "1:486441035059:web:6e4f676805eacd37268a46",
    measurementId: "G-4FEWX0XTQW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
