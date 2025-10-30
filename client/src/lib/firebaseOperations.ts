// Firebase Firestore operations for Cricket Universe
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  increment 
} from 'firebase/firestore';
import { db } from './firebase';
import type { 
  Player, 
  Product, 
  NewsPost, 
  Video, 
  Tournament, 
  Fixture, 
  Result, 
  ForumCategory, 
  ForumThread, 
  ForumComment, 
  Order,
  InsertPlayer,
  InsertProduct,
  InsertPost,
  InsertVideo,
  InsertTournament,
  InsertFixture,
  InsertResult,
  InsertThread,
  InsertComment,
  CreateOrder
} from '@shared/schema';

// Helper function to generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// ==================== PLAYERS ====================
export const playersCollection = () => collection(db, 'players');

export const getAllPlayers = async (): Promise<Player[]> => {
  const querySnapshot = await getDocs(playersCollection());
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Player));
};

export const getPlayerBySlug = async (slug: string): Promise<Player | null> => {
  const q = query(playersCollection(), where('slug', '==', slug));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Player;
};

export const createPlayer = async (data: InsertPlayer, userId?: string): Promise<string> => {
  const slug = generateSlug(data.name);
  const playerData = {
    ...data,
    slug,
    stats: {
      matches: 0,
      runs: 0,
      wickets: 0,
      average: 0,
      strikeRate: 0,
      centuries: 0,
      halfCenturies: 0,
    },
    userId: userId || null,
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(playersCollection(), playerData);
  return docRef.id;
};

export const updatePlayer = async (id: string, data: Partial<Player>): Promise<void> => {
  const docRef = doc(db, 'players', id);
  await updateDoc(docRef, data);
};

export const deletePlayer = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'players', id));
};

// ==================== PRODUCTS ====================
export const productsCollection = () => collection(db, 'products');

export const getAllProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(productsCollection());
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const q = query(productsCollection(), where('featured', '==', true), limit(4));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const createProduct = async (data: InsertProduct): Promise<string> => {
  const slug = generateSlug(data.title);
  const productData = {
    ...data,
    slug,
    images: data.images || [],
    featured: data.featured || false,
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(productsCollection(), productData);
  return docRef.id;
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<void> => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, data);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'products', id));
};

// ==================== ORDERS ====================
export const ordersCollection = () => collection(db, 'orders');

export const createOrder = async (data: CreateOrder, userId?: string): Promise<string> => {
  const total = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const orderData = {
    ...data,
    userId: userId || null,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(ordersCollection(), orderData);
  return docRef.id;
};

export const updateOrderStatus = async (id: string, status: 'pending' | 'confirmed' | 'delivered'): Promise<void> => {
  const docRef = doc(db, 'orders', id);
  await updateDoc(docRef, { status });
};

export const getAllOrders = async (): Promise<Order[]> => {
  const querySnapshot = await getDocs(query(ordersCollection(), orderBy('createdAt', 'desc')));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};

// ==================== NEWS & BLOG ====================
export const postsCollection = () => collection(db, 'posts');

export const getNewsPosts = async (): Promise<NewsPost[]> => {
  const q = query(postsCollection(), where('type', '==', 'news'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsPost));
};

export const getBlogPosts = async (): Promise<NewsPost[]> => {
  const q = query(postsCollection(), where('type', '==', 'blog'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsPost));
};

export const getLatestNews = async (count: number = 3): Promise<NewsPost[]> => {
  const q = query(postsCollection(), where('type', '==', 'news'), orderBy('createdAt', 'desc'), limit(count));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsPost));
};

export const createPost = async (data: InsertPost, authorId: string, authorName: string): Promise<string> => {
  const slug = generateSlug(data.title);
  const postData = {
    ...data,
    slug,
    authorId,
    authorName,
    tags: data.tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const docRef = await addDoc(postsCollection(), postData);
  return docRef.id;
};

export const updatePost = async (id: string, data: Partial<NewsPost>): Promise<void> => {
  const docRef = doc(db, 'posts', id);
  await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
};

export const deletePost = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'posts', id));
};

// ==================== VIDEOS ====================
export const videosCollection = () => collection(db, 'videos');

export const getAllVideos = async (): Promise<Video[]> => {
  const querySnapshot = await getDocs(query(videosCollection(), orderBy('createdAt', 'desc')));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Video));
};

export const createVideo = async (data: InsertVideo): Promise<string> => {
  const videoData = {
    ...data,
    views: 0,
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(videosCollection(), videoData);
  return docRef.id;
};

export const incrementVideoViews = async (id: string): Promise<void> => {
  const docRef = doc(db, 'videos', id);
  await updateDoc(docRef, { views: increment(1) });
};

// ==================== TOURNAMENTS ====================
export const tournamentsCollection = () => collection(db, 'tournaments');
export const fixturesCollection = () => collection(db, 'fixtures');
export const resultsCollection = () => collection(db, 'results');

export const getAllTournaments = async (): Promise<Tournament[]> => {
  const querySnapshot = await getDocs(tournamentsCollection());
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tournament));
};

export const createTournament = async (data: InsertTournament): Promise<string> => {
  const slug = generateSlug(data.name);
  const tournamentData = {
    ...data,
    slug,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(tournamentsCollection(), tournamentData);
  return docRef.id;
};

export const getUpcomingFixtures = async (count: number = 5): Promise<Fixture[]> => {
  const q = query(
    fixturesCollection(), 
    where('status', 'in', ['upcoming', 'live']), 
    orderBy('matchDate', 'asc'),
    limit(count)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Fixture));
};

export const createFixture = async (data: InsertFixture, tournamentName: string): Promise<string> => {
  const fixtureData = {
    ...data,
    tournamentName,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(fixturesCollection(), fixtureData);
  return docRef.id;
};

export const createResult = async (data: InsertResult, fixtureData: Fixture): Promise<string> => {
  const resultData = {
    ...data,
    tournamentName: fixtureData.tournamentName,
    team1: fixtureData.team1,
    team2: fixtureData.team2,
    matchDate: fixtureData.matchDate,
    venue: fixtureData.venue,
    createdAt: new Date().toISOString(),
  };
  
  // Update fixture status to completed
  const fixtureRef = doc(db, 'fixtures', data.fixtureId);
  await updateDoc(fixtureRef, { status: 'completed' });
  
  const docRef = await addDoc(resultsCollection(), resultData);
  return docRef.id;
};

// ==================== FORUM ====================
export const categoriesCollection = () => collection(db, 'forumCategories');
export const threadsCollection = () => collection(db, 'forumThreads');
export const commentsCollection = () => collection(db, 'forumComments');

export const getAllCategories = async (): Promise<ForumCategory[]> => {
  const querySnapshot = await getDocs(categoriesCollection());
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ForumCategory));
};

export const createThread = async (
  data: InsertThread, 
  authorId: string, 
  authorName: string, 
  categoryName: string
): Promise<string> => {
  const threadData = {
    ...data,
    categoryName,
    authorId,
    authorName,
    isPinned: false,
    isLocked: false,
    views: 0,
    commentCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const docRef = await addDoc(threadsCollection(), threadData);
  
  // Increment category thread count
  const categoryRef = doc(db, 'forumCategories', data.categoryId);
  await updateDoc(categoryRef, { threadCount: increment(1) });
  
  return docRef.id;
};

export const createComment = async (
  data: InsertComment,
  authorId: string,
  authorName: string,
  authorAvatar?: string
): Promise<string> => {
  const commentData = {
    ...data,
    authorId,
    authorName,
    authorAvatar: authorAvatar || undefined,
    likes: 0,
    likedBy: [],
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(commentsCollection(), commentData);
  
  // Increment thread comment count
  const threadRef = doc(db, 'forumThreads', data.threadId);
  await updateDoc(threadRef, { 
    commentCount: increment(1),
    updatedAt: new Date().toISOString(),
  });
  
  return docRef.id;
};

export const toggleCommentLike = async (commentId: string, userId: string): Promise<void> => {
  const commentRef = doc(db, 'forumComments', commentId);
  const commentDoc = await getDoc(commentRef);
  
  if (!commentDoc.exists()) return;
  
  const comment = commentDoc.data() as ForumComment;
  const likedBy = comment.likedBy || [];
  
  if (likedBy.includes(userId)) {
    // Unlike
    await updateDoc(commentRef, {
      likes: increment(-1),
      likedBy: likedBy.filter(id => id !== userId),
    });
  } else {
    // Like
    await updateDoc(commentRef, {
      likes: increment(1),
      likedBy: [...likedBy, userId],
    });
  }
};

// ==================== STATS ====================
export const getAdminStats = async () => {
  const [usersSnap, productsSnap, ordersSnap, playersSnap] = await Promise.all([
    getDocs(collection(db, 'users')),
    getDocs(productsCollection()),
    getDocs(query(ordersCollection(), where('status', '==', 'pending'))),
    getDocs(playersCollection()),
  ]);

  return {
    users: usersSnap.size,
    products: productsSnap.size,
    pendingOrders: ordersSnap.size,
    players: playersSnap.size,
  };
};
