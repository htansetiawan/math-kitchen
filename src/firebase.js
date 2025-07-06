import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Debug: Log environment variables
console.log('Environment variables:', {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

// Firebase configuration using environment variables with fallbacks
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCCQMBzVXDxJP1LNo_IZmgk76oQ3A67Plk",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "math-kitchen.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "math-kitchen",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "math-kitchen.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "693373997037",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:693373997037:web:063bb16e116cc3781721e4",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-M642LS37EG"
};

console.log('Final Firebase config:', firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported (handles development/blocked scenarios)
let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { app, analytics }; 