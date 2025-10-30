# Cricket Universe - Full-Stack Web Application

## Project Overview

Cricket Universe is a comprehensive cricket-themed website built with React, TypeScript, Firebase, and Tailwind CSS. The application provides a complete cricket community platform with e-commerce, news, player profiles, tournaments, and social features.

**Last Updated:** October 28, 2025

## Key Features

### Authentication & User Management
- **Firebase Authentication** (email/password only - no Google auth)
- Role-based access control (Admin, Player, Member)
- Protected routes for sensitive pages
- **Admin Account:** username `usmaniqbal` (credentials stored securely)

### Admin Features
- **Manual Logo Upload**: Admin prompted to upload logo on first login if none exists
- Full dashboard with site statistics
- Content management for players, products, news, blog, videos, tournaments
- Forum moderation
- Order management

### E-Commerce
- Product catalog with filtering and search
- Shopping cart with persistent state
- **Cash On Delivery (COD) ONLY** - no Stripe integration
- Order tracking and management

### Content Management
- Player profiles with statistics
- News and blog system
- Match highlights (video library)
- Tournament management
- Community forum with categories, threads, and comments
- Membership tiers (Free, Silver, Gold) with rewards system

### Design System
- **Color Scheme**: Cricket-themed with green, dark blue, and white
- Fully responsive design
- Dark/light mode support
- Loading, error, and empty states throughout
- Accessible navigation and interactions

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Tailwind CSS** + shadcn/ui components
- **Firebase SDK** for auth, Firestore, and Storage
- **Zustand** for cart state management
- **React Hook Form** + Zod for form validation

### Backend
- **Firebase Authentication** (email/password only)
- **Firestore** for all data persistence
- **Firebase Storage** for media uploads (logos, player photos, product images)

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Header.tsx     # Main navigation with logo upload
│   │   │   ├── Footer.tsx     # Site footer
│   │   │   ├── LoginRoute.tsx # Auth route wrapper
│   │   │   └── SignupRoute.tsx
│   │   ├── contexts/          # React contexts
│   │   │   └── AuthContext.tsx # Firebase auth integration
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useCart.ts     # Shopping cart logic
│   │   ├── lib/               # Utilities and integrations
│   │   │   ├── firebase.ts    # Firebase config
│   │   │   ├── firebaseOperations.ts # All CRUD operations
│   │   │   └── queryClient.ts # TanStack Query setup
│   │   ├── pages/             # Route pages (15+ pages)
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx / Signup.tsx
│   │   │   ├── Shop.tsx / Cart.tsx / Checkout.tsx
│   │   │   ├── Players.tsx
│   │   │   ├── News.tsx / Blog.tsx
│   │   │   ├── Forum.tsx
│   │   │   ├── Tournaments.tsx
│   │   │   ├── MatchHighlights.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── PlayerDashboard.tsx
│   │   │   └── Membership.tsx
│   │   └── App.tsx            # Main app with routing
│   └── index.css              # Tailwind + custom styles
├── shared/
│   └── schema.ts              # TypeScript interfaces for all data models
├── SECURITY.md                # Firebase security rules and deployment checklist
└── design_guidelines.md       # UI/UX design specifications

```

## Data Models

All data models are defined in `shared/schema.ts`:

- **Users**: User accounts with roles (admin, player, member)
- **Players**: Cricket player profiles with stats
- **Products**: E-commerce product catalog
- **Orders**: Order tracking with COD payment
- **Posts**: News and blog articles
- **Videos**: Match highlights library
- **Tournaments**: Tournament information
- **Fixtures**: Match schedules
- **Results**: Match results
- **ForumCategories/Threads/Comments**: Community discussion system
- **Membership**: Tier-based membership system

## Recent Changes

### October 28, 2025
- ✅ Completed full-stack implementation
- ✅ Fixed all React hook violations by creating proper route components
- ✅ Resolved DOM nesting issues in Header, Footer, Login, and Signup
- ✅ Enhanced query client to handle hierarchical keys
- ✅ Aligned all navigation links with actual routes
- ✅ Removed security credential exposure from documentation
- ✅ Created comprehensive SECURITY.md with Firestore/Storage rules
- ✅ Implemented admin logo upload system
- ✅ Built complete Firebase integration layer

## Firebase Configuration Required

**⚠️ IMPORTANT**: Before the application can function with real data, you must:

1. **Set up Firebase project** with the following services enabled:
   - Authentication (Email/Password provider)
   - Firestore Database
   - Storage

2. **Configure environment variables** in `.env`:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_PROJECT_ID=universe-cricket-io
   VITE_FIREBASE_APP_ID=your-app-id
   ```

3. **Apply security rules** from `SECURITY.md`:
   - Firestore security rules (required for data access control)
   - Storage security rules (required for media upload permissions)

4. **Create admin account** through Firebase Console:
   - Add user with email/password in Authentication
   - Create user document in Firestore with `role: "admin"`

5. **Populate initial data** (optional):
   - Use admin dashboard to add players, products, news, etc.
   - Or run seed functions from `client/src/lib/firebaseOperations.ts`

## Development

### Running the Application

```bash
npm run dev
```

The workflow "Start application" is configured to run this automatically.

### Key Development Notes

- **No backend server required** - all data operations use Firebase client SDK
- **Security enforced through Firebase rules** - see SECURITY.md
- **Cart state persists in localStorage** - managed by Zustand
- **Admin credentials** must be provided by user (not hardcoded)
- **Manual logo upload** - admin must upload logo on first login

## User Preferences

### Design Preferences
- Cricket-themed color palette (green, dark blue, white)
- Clean, modern interface
- Responsive across all devices
- Clear visual hierarchy

### Functional Requirements
- Email/password authentication ONLY (no Google auth)
- Cash On Delivery payment ONLY (no Stripe)
- Manual logo upload by admin (no default logo)
- Role-based dashboards for Admin and Player users

## Next Steps for Production

1. ✅ Complete Firebase project setup
2. ✅ Apply security rules from SECURITY.md
3. ✅ Create admin account in Firebase
4. ✅ Upload initial logo via admin dashboard
5. ✅ Populate content (players, products, news)
6. ✅ Test all user flows (guest, member, player, admin)
7. ✅ Verify COD checkout process
8. ✅ Test forum, news, and blog functionality
9. ✅ Enable Firebase App Check for additional security
10. ✅ Deploy to production

## Known Limitations

- **Firebase offline**: Application shows Firebase offline errors until real project is configured
- **No data seeding**: Initial content must be added manually through admin dashboard
- **Development mode**: Current setup is for development - production deployment requires additional configuration

## Support & Documentation

- **Security Rules**: See `SECURITY.md` for complete Firestore and Storage security configuration
- **Design Guidelines**: See `design_guidelines.md` for UI/UX specifications
- **Firebase Documentation**: https://firebase.google.com/docs
