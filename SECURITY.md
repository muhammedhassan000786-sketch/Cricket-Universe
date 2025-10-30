# Security Considerations for Cricket Universe

## Firebase Security Rules Required

⚠️ **IMPORTANT**: This application exposes Firebase operations directly from the client-side. Before deploying to production, you **MUST** configure Firestore Security Rules in the Firebase console.

### Required Firestore Security Rules

Add these rules in the Firebase Console (Firestore Database → Rules):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Helper function to check if user is player
    function isPlayer() {
      return request.auth != null && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'player';
    }
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if request.auth.uid == userId;
      allow update, delete: if isAdmin() || request.auth.uid == userId;
    }
    
    // Players collection - Admin only for write
    match /players/{playerId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Products collection - Admin only for write
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read: if isAdmin() || resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Posts (News/Blog) - Admin only for write
    match /posts/{postId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Videos - Admin only for write
    match /videos/{videoId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Tournaments - Admin only for write
    match /tournaments/{tournamentId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Fixtures - Admin only for write
    match /fixtures/{fixtureId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Results - Admin only for write
    match /results/{resultId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Forum categories - Admin only for write
    match /forumCategories/{categoryId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Forum threads
    match /forumThreads/{threadId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update: if isAdmin() || resource.data.authorId == request.auth.uid;
      allow delete: if isAdmin();
    }
    
    // Forum comments
    match /forumComments/{commentId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update: if isAdmin() || resource.data.authorId == request.auth.uid;
      allow delete: if isAdmin();
    }
    
    // Site settings - Admin only
    match /settings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

### Firebase Storage Rules

Add these rules for Firebase Storage (Storage → Rules):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Site assets (logos) - Admin only
    match /site/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Player photos - Admin only
    match /players/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Product images - Admin only
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Post images - Admin only
    match /posts/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // User uploads - Authenticated users
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

## Admin Account Setup

The admin account must be created manually through Firebase Console:
1. Go to Firebase Console → Authentication
2. Add a new user with email/password authentication
3. Create the user with the admin email address
4. Go to Firestore Database → users collection
5. Create a document for this user with the following structure:
   ```json
   {
     "id": "<firebase-auth-uid>",
     "email": "<admin-email>",
     "username": "usmaniqbal",
     "role": "admin",
     "membershipTier": "gold",
     "rewardsPoints": 0,
     "createdAt": "<timestamp>"
   }
   ```

⚠️ **IMPORTANT**: Store admin credentials securely using a password manager. Never commit credentials to version control.

## Production Deployment Checklist

Before deploying to production:

1. ✅ Configure Firestore Security Rules (see above)
2. ✅ Configure Storage Security Rules (see above)
3. ✅ Create admin account in Firebase Auth
4. ✅ Update admin user document in Firestore with role: 'admin'
5. ✅ Enable email/password authentication in Firebase Console
6. ✅ Add production domain to Firebase authorized domains
7. ✅ Review and test all security rules
8. ✅ Enable Firebase App Check for additional security
9. ✅ Set up proper monitoring and logging

## Current Development State

⚠️ The current implementation is for **development/demonstration purposes only**. All Firebase operations are exposed on the client-side without server-side enforcement. This setup is intentional for the MVP but must be secured before production deployment using the security rules provided above.
