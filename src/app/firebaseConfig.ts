// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfMjVoDdhBs-aQWVD3G8frZKOtBdZX5NM",
  authDomain: "foodapp-ef208.firebaseapp.com",
  projectId: "foodapp-ef208",
  storageBucket: "foodapp-ef208.appspot.com",
  messagingSenderId: "755100315372",
  appId: "1:755100315372:web:16b1dc48725128f3eeffc9",
  measurementId: "G-RXEQ1SDX1H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
console.log(auth);
