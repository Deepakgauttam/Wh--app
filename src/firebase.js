import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC4H8ontlo6RoBBcrUydNuvxWz-vRbX4q0",
  authDomain: "whatsapp-new-clone-21ea4.firebaseapp.com",
  projectId: "whatsapp-new-clone-21ea4",
  storageBucket: "whatsapp-new-clone-21ea4.appspot.com",
  messagingSenderId: "690536364847",
  appId: "1:690536364847:web:5fe7b02dd71a33cc5abfda",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
