// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBCAuiIqRuFPUGEyh2L6XTzYLjzkcI_lTc',
  authDomain: 'invoice-app-365e0.firebaseapp.com',
  projectId: 'invoice-app-365e0',
  storageBucket: 'invoice-app-365e0.appspot.com',
  messagingSenderId: '5849861569',
  appId: '1:5849861569:web:cbcddeed4e631adb0cf340',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
