import { doc, getDoc, setDoc, runTransaction } from 'firebase/firestore';
import { db } from './firebase';

export async function checkUsernameAvailable(username: string): Promise<boolean> {
  const lowerUsername = username.toLowerCase().trim();
  const usernameDoc = await getDoc(doc(db, 'usernames', lowerUsername));
  return !usernameDoc.exists();
}

export async function checkEmailAvailable(email: string): Promise<boolean> {
  try {
    const emailDoc = await getDoc(doc(db, 'emails', email.toLowerCase()));
    return !emailDoc.exists();
  } catch (error) {
    return true;
  }
}

export async function getEmailByUsername(username: string): Promise<string | null> {
  const lowerUsername = username.toLowerCase().trim();
  const usernameDoc = await getDoc(doc(db, 'usernames', lowerUsername));
  
  if (!usernameDoc.exists()) {
    return null;
  }
  
  const uid = usernameDoc.data().uid;
  const userDoc = await getDoc(doc(db, 'users', uid));
  
  if (!userDoc.exists()) {
    return null;
  }
  
  return userDoc.data().email;
}

export function isEmail(input: string): boolean {
  return input.includes('@');
}

export function validateUsername(username: string): { valid: boolean; error?: string } {
  const trimmed = username.trim();
  
  if (trimmed.length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters' };
  }
  
  if (trimmed.length > 20) {
    return { valid: false, error: 'Username must be less than 20 characters' };
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return { valid: false, error: 'Username can only contain letters, numbers, and underscores' };
  }
  
  return { valid: true };
}

export async function registerUsernameMapping(
  uid: string,
  username: string,
  email: string
): Promise<void> {
  const lowerUsername = username.toLowerCase().trim();
  const lowerEmail = email.toLowerCase();

  await runTransaction(db, async (transaction) => {
    const usernameRef = doc(db, 'usernames', lowerUsername);
    const emailRef = doc(db, 'emails', lowerEmail);
    
    const usernameDoc = await transaction.get(usernameRef);
    const emailDoc = await transaction.get(emailRef);
    
    if (usernameDoc.exists()) {
      throw new Error('Username already taken');
    }
    
    if (emailDoc.exists()) {
      throw new Error('Email already registered');
    }
    
    transaction.set(usernameRef, { 
      uid, 
      claimedAt: new Date().toISOString() 
    });
    
    transaction.set(emailRef, { 
      uid, 
      claimedAt: new Date().toISOString() 
    });
  });
}
