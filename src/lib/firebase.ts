import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
  ];

  const missing = requiredEnvVars.filter(
    (varName) => !import.meta.env[varName]
  );

  if (missing.length > 0) {
    console.error(
      '❌ Firebase Configuration Error:\n' +
      'Missing environment variables: ' + missing.join(', ') + '\n\n' +
      '📝 To fix this:\n' +
      '1. Copy .env.example to .env\n' +
      '2. Add your Firebase credentials from Firebase Console\n' +
      '3. Restart the dev server\n\n' +
      'See QUICKSTART.md for detailed instructions.'
    );
    return false;
  }

  return true;
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Validate before initializing
const isConfigValid = validateFirebaseConfig();

// Initialize Firebase with error handling
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let googleProvider: GoogleAuthProvider | undefined;
let db: Firestore | undefined;

try {
  if (isConfigValid) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    db = getFirestore(app);
  } else {
    // Create mock objects to prevent crashes
    console.warn('⚠️ Firebase not initialized - using mock mode');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.error('Please check your .env file and Firebase configuration');
}

export { auth, googleProvider, db };
export default app;

