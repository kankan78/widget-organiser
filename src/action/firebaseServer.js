// Server-side Firebase configuration for sensitive operations
// This should only be used in API routes or server-side functions

import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Server-side Firebase configuration
const firebaseServerConfig = {
  apiKey: process.env.FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase app for server-side use
let serverApp;
if (getApps().length === 0) {
  serverApp = initializeApp(firebaseServerConfig, 'server');
} else {
  serverApp = getApps().find(app => app.name === 'server') || getApps()[0];
}

// Initialize Firebase services for server
export const serverDb = getFirestore(serverApp);
export const serverAuth = getAuth(serverApp);
export const serverStorage = getStorage(serverApp);

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
  // Only connect to emulators if not already connected
  try {
    if (!serverDb._delegate._settings?.host?.includes('localhost')) {
      connectFirestoreEmulator(serverDb, 'localhost', 8080);
    }
  } catch (error) {
    // Emulator already connected or not available
  }

  try {
    if (!serverAuth._delegate._config?.emulator) {
      connectAuthEmulator(serverAuth, 'http://localhost:9099');
    }
  } catch (error) {
    // Emulator already connected or not available
  }

  try {
    if (!serverStorage._delegate._host?.includes('localhost')) {
      connectStorageEmulator(serverStorage, 'localhost', 9199);
    }
  } catch (error) {
    // Emulator already connected or not available
  }
}

export default serverApp;
