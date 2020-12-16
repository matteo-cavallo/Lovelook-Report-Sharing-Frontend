import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBWragWLRquub1Hwxcq0dxS9ClIlJI7MeY",
  authDomain: "shopify-report-sharing.firebaseapp.com",
  projectId: "shopify-report-sharing",
  storageBucket: "shopify-report-sharing.appspot.com",
  messagingSenderId: "805745722762",
  appId: "1:805745722762:web:790d860ce97b8890e8f473",
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

// Export auth
// Google Provider
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };
