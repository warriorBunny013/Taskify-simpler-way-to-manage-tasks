
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCs0wTdOz8zvYpkb9u-zBvwpvfaddIOJbY",
  authDomain: "todolist-755a8.firebaseapp.com",
  projectId: "todolist-755a8",
  storageBucket: "todolist-755a8.appspot.com",
  messagingSenderId: "627401742746",
  appId: "1:627401742746:web:32f4673fcad5cc717fc223"
};
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
export const auth=getAuth();