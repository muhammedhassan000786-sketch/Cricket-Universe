import { z } from "zod";

// ==================== USER & AUTH ====================
export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'player' | 'member';
  createdAt: string;
  avatarUrl?: string;
  membershipTier?: 'free' | 'silver' | 'gold';
  rewardsPoints?: number;
}

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;

// ==================== PLAYERS ====================
export interface Player {
  id: string;
  name: string;
  slug: string;
  age: number;
  role: string; // Batsman, Bowler, All-rounder, Wicket-keeper
  bio: string;
  photoUrl: string;
  stats: PlayerStats;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  createdAt: string;
  userId?: string; // Link to user account if they're a player
}

export interface PlayerStats {
  matches: number;
  runs: number;
  wickets: number;
  average: number;
  strikeRate: number;
  centuries: number;
  halfCenturies: number;
  economy?: number;
}

export const insertPlayerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(15).max(50),
  role: z.string(),
  bio: z.string(),
  photoUrl: z.string().url().optional(),
});

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;

// ==================== PRODUCTS ====================
export interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string;
  price: number;
  inventory: number;
  images: string[];
  description: string;
  category: string; // Equipment, Apparel, Accessories
  featured: boolean;
  createdAt: string;
}

export const insertProductSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  sku: z.string(),
  price: z.number().positive("Price must be positive"),
  inventory: z.number().min(0),
  description: z.string(),
  category: z.string(),
  images: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;

// ==================== ORDERS ====================
export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  price: number;
}

export const createOrderSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerPhone: z.string().min(10, "Valid phone number required"),
  customerAddress: z.string().min(10, "Address is required"),
  items: z.array(z.object({
    productId: z.string(),
    productTitle: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
  })),
});

export type CreateOrder = z.infer<typeof createOrderSchema>;

// ==================== NEWS & BLOG ====================
export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorId: string;
  authorName: string;
  featuredImage: string;
  tags: string[];
  category: string;
  type: 'news' | 'blog';
  createdAt: string;
  updatedAt: string;
}

export const insertPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  featuredImage: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string(),
  type: z.enum(['news', 'blog']),
});

export type InsertPost = z.infer<typeof insertPostSchema>;

// ==================== VIDEOS ====================
export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId?: string;
  vimeoId?: string;
  videoUrl?: string;
  thumbnailUrl: string;
  category: string; // Match Highlights, Training, Interviews
  teamName?: string;
  tournamentName?: string;
  views: number;
  duration?: string;
  createdAt: string;
}

export const insertVideoSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string(),
  youtubeId: z.string().optional(),
  vimeoId: z.string().optional(),
  videoUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  category: z.string(),
  teamName: z.string().optional(),
  tournamentName: z.string().optional(),
});

export type InsertVideo = z.infer<typeof insertVideoSchema>;

// ==================== TOURNAMENTS & FIXTURES ====================
export interface Tournament {
  id: string;
  name: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  logoUrl?: string;
  createdAt: string;
}

export interface Fixture {
  id: string;
  tournamentId: string;
  tournamentName: string;
  team1: string;
  team2: string;
  matchDate: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  createdAt: string;
}

export interface Result {
  id: string;
  fixtureId: string;
  tournamentName: string;
  team1: string;
  team2: string;
  team1Score: string;
  team2Score: string;
  winner: string;
  matchDate: string;
  venue: string;
  manOfTheMatch?: string;
  createdAt: string;
}

export const insertTournamentSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  logoUrl: z.string().url().optional(),
});

export const insertFixtureSchema = z.object({
  tournamentId: z.string(),
  team1: z.string().min(2),
  team2: z.string().min(2),
  matchDate: z.string(),
  venue: z.string(),
});

export const insertResultSchema = z.object({
  fixtureId: z.string(),
  team1Score: z.string(),
  team2Score: z.string(),
  winner: z.string(),
  manOfTheMatch: z.string().optional(),
});

export type InsertTournament = z.infer<typeof insertTournamentSchema>;
export type InsertFixture = z.infer<typeof insertFixtureSchema>;
export type InsertResult = z.infer<typeof insertResultSchema>;

// ==================== FORUM ====================
export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  threadCount: number;
  createdAt: string;
}

export interface ForumThread {
  id: string;
  categoryId: string;
  categoryName: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  isPinned: boolean;
  isLocked: boolean;
  views: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ForumComment {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likes: number;
  likedBy: string[];
  createdAt: string;
}

export const insertThreadSchema = z.object({
  categoryId: z.string(),
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
});

export const insertCommentSchema = z.object({
  threadId: z.string(),
  content: z.string().min(3, "Comment must be at least 3 characters"),
});

export type InsertThread = z.infer<typeof insertThreadSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;

// ==================== MEMBERSHIP ====================
export interface Membership {
  id: string;
  userId: string;
  tier: 'free' | 'silver' | 'gold';
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
}

export const membershipTiers = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Access to news and blog',
      'View match highlights',
      'Community forum access',
      'Basic player stats',
    ],
  },
  silver: {
    name: 'Silver',
    price: 999,
    features: [
      'Everything in Free',
      'Exclusive training guides',
      '10% discount on shop',
      'Early access to tickets',
      'Ad-free experience',
    ],
  },
  gold: {
    name: 'Gold',
    price: 1999,
    features: [
      'Everything in Silver',
      'Live match streaming',
      '20% discount on shop',
      'VIP event access',
      'Direct player interactions',
      'Premium content access',
    ],
  },
};

// ==================== SITE SETTINGS ====================
export interface SiteSettings {
  id: string;
  logoUrl?: string;
  siteName: string;
  tagline: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  contactEmail: string;
  contactPhone: string;
  updatedAt: string;
}
