import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCbjhepAlYuQr0uOeK_hXR7yiSuEwkgBl8",
  authDomain: "react-ecommerce-a8edb.firebaseapp.com",
  projectId: "react-ecommerce-a8edb",
  storageBucket: "react-ecommerce-a8edb.appspot.com",
  messagingSenderId: "733757055901",
  appId: "1:733757055901:web:ea620c0836f17b392a8574",
  measurementId: "G-C0M8C87DYS",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

 const userRef = firestore.doc(`users/${userAuth.uid}`)

 const snapShot = await userRef.get();

 if(!snapShot.exists) {
   const {displayName, email} = userAuth;
   const createdAt = new Date();

   try {
     await userRef.set({
       displayName,
       email,
       createdAt,
       ...additionalData
     })
   } catch (err) {
     console.log('error creating user', err.message)
   }
 }

 return userRef
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
