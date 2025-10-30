// Custom query client configuration for Firebase integration
import { QueryClient } from '@tanstack/react-query';
import * as firebaseOps from './firebaseOperations';

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
};

export const firebaseQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const key = queryKey[0] as string;
        
        // Handle parameterized queries
        if (key.startsWith('/api/players/') && key !== '/api/players/me') {
          const slug = key.split('/').pop();
          return firebaseOps.getPlayerBySlug(slug!);
        }
        
        // Handle static queries
        const handler = queryHandlers[key];
        if (handler) {
          return handler();
        }
        
        // Fallback to empty data for unimplemented queries
        return null;
      },
      staleTime: 30 * 1000, // 30 seconds
      refetchOnWindowFocus: false,
    },
  },
});
