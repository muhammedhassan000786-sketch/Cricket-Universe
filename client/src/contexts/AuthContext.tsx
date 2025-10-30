import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { 
  isEmail, 
  getEmailByUsername, 
  validateUsername, 
  registerUsernameMapping,
  checkUsernameAvailable
} from '@/lib/authHelpers';
import type { User } from '@shared/schema';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signIn: (emailOrUsername: string, password: string) => Promise<void>;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        }
      } else {
        setUser(null);
      }
      setFirebaseUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (emailOrUsername: string, password: string) => {
    let email = emailOrUsername;
    
    if (!isEmail(emailOrUsername)) {
      const foundEmail = await getEmailByUsername(emailOrUsername);
      if (!foundEmail) {
        throw new Error('Username not found');
      }
      email = foundEmail;
    }
    
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, username: string, password: string) => {
    const validation = validateUsername(username);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const usernameAvailable = await checkUsernameAvailable(username);
    if (!usernameAvailable) {
      throw new Error('Username already taken');
    }

    const credential = await createUserWithEmailAndPassword(auth, email, password);
    
    try {
      await registerUsernameMapping(credential.user.uid, username, email);
      
      const newUser: User = {
        id: credential.user.uid,
        email,
        username,
        role: 'member',
        createdAt: new Date().toISOString(),
        membershipTier: 'free',
        rewardsPoints: 0,
      };
      
      await setDoc(doc(db, 'users', credential.user.uid), newUser);
      await updateProfile(credential.user, { displayName: username });
      setUser(newUser);
    } catch (error) {
      await credential.user.delete();
      throw error;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
