// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyA0hpoc2IJ1cfesG2N2X52BSxo85nfah9A",
    authDomain: "note-app-55683.firebaseapp.com",
    projectId: "note-app-55683",
    storageBucket: "note-app-55683.appspot.com",
    messagingSenderId: "880458140122",
    appId: "1:880458140122:web:f291e7e79a6146971098e3",
    measurementId: "G-V1R8KH4GD9"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);


export default fire;