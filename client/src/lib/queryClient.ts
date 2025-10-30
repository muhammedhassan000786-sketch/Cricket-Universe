import { QueryClient, QueryFunction } from "@tanstack/react-query";
import * as firebaseOps from './firebaseOperations';

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

// Map of query keys to Firebase operations
const queryHandlers: Record<string, () => Promise<any>> = {
  '/api/players': firebaseOps.getAllPlayers,
  '/api/products': firebaseOps.getAllProducts,
  '/api/products/featured': firebaseOps.getFeaturedProducts,
  '/api/news': firebaseOps.getNewsPosts,
  '/api/news/latest': () => firebaseOps.getLatestNews(3),
  '/api/blog': firebaseOps.getBlogPosts,
  '/api/videos': firebaseOps.getAllVideos,
  '/api/tournaments': firebaseOps.getAllTournaments,
  '/api/fixtures/upcoming': () => firebaseOps.getUpcomingFixtures(5),
  '/api/forum/categories': firebaseOps.getAllCategories,
  '/api/admin/stats': firebaseOps.getAdminStats,
  '/api/players/me': async () => null, // Will be implemented later
};

// Custom query function that uses Firebase instead of fetch
const firebaseQueryFn: QueryFunction = async ({ queryKey }) => {
  // Support both string keys and array keys
  const key = Array.isArray(queryKey) ? queryKey[0] as string : queryKey as string;
  const params = Array.isArray(queryKey) ? queryKey.slice(1) : [];
  
  // Handle parameterized queries with hierarchical keys
  if (key === '/api/players' && params.length > 0) {
    const slug = params[0] as string;
    return firebaseOps.getPlayerBySlug(slug);
  }
  
  // Handle other parameterized queries
  if (key.startsWith('/api/players/') && key !== '/api/players/me') {
    const slug = key.split('/').pop();
    return firebaseOps.getPlayerBySlug(slug!);
  }
  
  // Handle static queries
  const handler = queryHandlers[key];
  if (handler) {
    return handler();
  }
  
  // Fallback to empty array/null for unknown queries
  console.warn(`No handler found for query key: ${key}`);
  return [];
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: firebaseQueryFn,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 30 * 1000, // 30 seconds
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
