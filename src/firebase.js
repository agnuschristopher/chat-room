// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIv_pXKZgB-k2PcQbu1FzGp1BY4XhJArw",
  authDomain: "react-chat-app-490c8.firebaseapp.com",
  projectId: "react-chat-app-490c8",
  storageBucket: "react-chat-app-490c8.firebasestorage.app",
  messagingSenderId: "1085615665042",
  appId: "1:1085615665042:web:08c442fb854116cb435b4b",
  measurementId: "G-MP2GJSQVQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// EXPORTS: These tell React it's allowed to use these variables in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);