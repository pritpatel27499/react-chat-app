import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyBxuC0QV1q84kcZ5yqfu0e-2wdNd14gVuU",
  authDomain: "chat-app-master-781c1.firebaseapp.com",
  projectId: "chat-app-master-781c1",
  storageBucket: "chat-app-master-781c1.appspot.com",
  messagingSenderId: "103093082526",
  appId: "1:103093082526:web:ed7692bc2e7911b0729e8f",
  measurementId: "G-3B5BBX28GT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;
