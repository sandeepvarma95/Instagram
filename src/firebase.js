import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAqpiaJ0O-_eyuDj9of6Htrc7-BCT4QbsM",
  authDomain: "instagram-clone-dc578.firebaseapp.com",
  projectId: "instagram-clone-dc578",
  storageBucket: "instagram-clone-dc578.appspot.com",
  messagingSenderId: "385467301757",
  appId: "1:385467301757:web:64ca379a2aab85d0cc9614",
  measurementId: "G-7JF47EQ697"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };