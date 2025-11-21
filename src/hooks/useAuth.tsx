import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';
import { User, UserProfile } from '../types';


interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Firebase is initialized
    if (!auth) {
      console.warn('⚠️ Firebase Auth not initialized');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userData: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        setUser(userData);

        // Load user profile
        if (db) {
          try {
            const profileDoc = await getDoc(doc(db, 'users', firebaseUser.uid, 'profile', 'data'));
            if (profileDoc.exists()) {
              setProfile(profileDoc.data() as UserProfile);
            }
          } catch (error) {
            console.error('Error loading profile:', error);
          }
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    if (!auth || !db) {
      throw new Error('Firebase not initialized. Please check your .env configuration.');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Initialize user profile
    const defaultProfile: UserProfile = {
      name: '',
      partnerName: '',
      loveLanguage: 'words',
      cycleStartDate: new Date().toISOString(),
      cycleLength: 28,
      notificationsEnabled: true,
    };

    await setDoc(doc(db, 'users', userCredential.user.uid, 'profile', 'data'), defaultProfile);
    setProfile(defaultProfile);
  };

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      throw new Error('Firebase not initialized. Please check your .env configuration.');
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    if (!auth || !googleProvider || !db) {
      throw new Error('Firebase not initialized. Please check your .env configuration.');
    }

    const userCredential = await signInWithPopup(auth, googleProvider);
    
    // Check if profile exists, if not create default
    const profileDoc = await getDoc(doc(db, 'users', userCredential.user.uid, 'profile', 'data'));
    if (!profileDoc.exists()) {
      const defaultProfile: UserProfile = {
        name: userCredential.user.displayName || '',
        partnerName: '',
        loveLanguage: 'words',
        cycleStartDate: new Date().toISOString(),
        cycleLength: 28,
        notificationsEnabled: true,
      };
      await setDoc(doc(db, 'users', userCredential.user.uid, 'profile', 'data'), defaultProfile);
      setProfile(defaultProfile);
    }
  };

  const logout = async () => {
    if (!auth) {
      throw new Error('Firebase not initialized. Please check your .env configuration.');
    }
    await signOut(auth);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !db) return;
    
    const newProfile = { ...profile, ...updates } as UserProfile;
    await setDoc(doc(db, 'users', user.uid, 'profile', 'data'), newProfile);
    setProfile(newProfile);
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
