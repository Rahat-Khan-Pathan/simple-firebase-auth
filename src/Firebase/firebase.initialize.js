// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
import firebaseConfig from "./firebase.config";

// Initialize Firebase
const initializeAuthentication = () => {
    initializeApp(firebaseConfig);
}

export default initializeAuthentication;
