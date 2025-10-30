// Initialize admin user in Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { User } from '@shared/schema';

export async function initializeAdmin() {
  const adminEmail = 'usmaniqbal@cricketuniverse.com';
  const adminPassword = 'cooperwindows1972';
  const adminUsername = 'usmaniqbal';

  try {
    // Check if admin already exists
    const adminQuery = await getDoc(doc(db, 'users', 'admin-user-id'));
    if (adminQuery.exists()) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user in Firebase Auth
    const credential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);

    // Create admin document in Firestore
    const adminUser: User = {
      id: credential.user.uid,
      email: adminEmail,
      username: adminUsername,
      role: 'admin',
      createdAt: new Date().toISOString(),
      membershipTier: 'gold',
      rewardsPoints: 0,
    };

    await setDoc(doc(db, 'users', credential.user.uid), adminUser);
    console.log('Admin user created successfully');
    
    return adminUser;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Admin email already in use, user may already exist');
    } else {
      console.error('Error creating admin user:', error);
    }
  }
}
