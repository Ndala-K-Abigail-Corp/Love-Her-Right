import { auth, db } from './firebase';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function signInAnonymouslyWithName(profile: { name?: string; partnerName?: string }) {
  const res = await signInAnonymously(auth);
  const user = res.user;
  // create a basic user document
  try {
    await setDoc(doc(db, 'users', user.uid), {
      name: profile.name || null,
      partner: { name: profile.partnerName || null },
      createdAt: new Date().toISOString()
    });
  } catch (e) {
    // ignore write errors for starter
    console.warn('Failed to write user doc:', e);
  }
  return user;
}

export function subscribeAuth(cb: (u: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

export async function signOut() {
  return auth.signOut();
}
