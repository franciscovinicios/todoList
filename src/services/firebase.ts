import { initializeApp as firebase } from "firebase/app";
import 'firebase/auth';
import { getAuth, signInWithPopup, signOut} from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAR-HFA-4WIG76Z1KMPKKXc6GRDjsilAJU",
  authDomain: "todo-2f04d.firebaseapp.com",
  databaseURL: "https://todo-2f04d-default-rtdb.firebaseio.com",
  projectId: "todo-2f04d",
  storageBucket: "todo-2f04d.appspot.com",
  messagingSenderId: "265025272729",
  appId: "1:265025272729:web:8efdec34d555cc8a67f108"
}; 

// Initialize Firebase
const app = firebase(firebaseConfig);
const auth = getAuth()
const database = getDatabase();
export { app, firebase, auth , signInWithPopup, signOut, database}

