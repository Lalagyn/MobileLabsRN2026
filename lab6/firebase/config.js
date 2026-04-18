import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY?.trim() || 'AIzaSyCDURMDxUNOuWIoie57pWaOuLR4W1wdezc',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim() || 'lab6-fc0ed.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID?.trim() || 'lab6-fc0ed',
  storageBucket:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim() || 'lab6-fc0ed.firebasestorage.app',
  messagingSenderId:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim() || '343969064825',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID?.trim() || '1:343969064825:web:ccedd27478a77e4ac731a8',
};

const missingFirebaseKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

const isFirebaseConfigured = missingFirebaseKeys.length === 0;

function getFirebaseConfigError() {
  if (isFirebaseConfigured) {
    return null;
  }

  return `Firebase не налаштований. Відсутні поля конфігурації: ${missingFirebaseKeys.join(', ')}.`;
}

const app = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;

export { app, auth, db, firebaseConfig, getFirebaseConfigError, isFirebaseConfigured };
