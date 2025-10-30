// Seed data for Cricket Universe
// This file contains functions to populate the database with initial data

import { 
  createPlayer, 
  createProduct, 
  createPost, 
  createVideo, 
  createTournament,
  createFixture,
} from './firebaseOperations';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export const seedForumCategories = async () => {
  const categories = [
    {
      name: 'General Discussion',
      slug: 'general-discussion',
      description: 'Talk about cricket in general',
      icon: '💬',
      threadCount: 0,
      createdAt: new Date().toISOString(),
    },
    {
      name: 'Match Analysis',
      slug: 'match-analysis',
      description: 'Discuss recent matches and performances',
      icon: '📊',
      threadCount: 0,
      createdAt: new Date().toISOString(),
    },
    {
      name: 'Player Talk',
      slug: 'player-talk',
      description: 'Discuss your favorite players',
      icon: '🏏',
      threadCount: 0,
      createdAt: new Date().toISOString(),
    },
    {
      name: 'Fantasy Cricket',
      slug: 'fantasy-cricket',
      description: 'Fantasy cricket tips and teams',
      icon: '🎮',
      threadCount: 0,
      createdAt: new Date().toISOString(),
    },
  ];

  for (const category of categories) {
    await addDoc(collection(db, 'forumCategories'), category);
  }
  
  console.log('Forum categories seeded');
};

export const seedPlayers = async () => {
  const players = [
    {
      name: 'Virat Kohli',
      age: 35,
      role: 'Batsman',
      bio: 'Indian cricket captain known for aggressive batting and excellent fielding.',
      photoUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400',
    },
    {
      name: 'Steve Smith',
      age: 34,
      role: 'Batsman',
      bio: 'Australian batting maestro with exceptional technique and run-scoring ability.',
      photoUrl: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=400',
    },
    {
      name: 'Jasprit Bumrah',
      age: 30,
      role: 'Bowler',
      bio: 'Indian pace spearhead known for yorkers and death bowling.',
      photoUrl: 'https://images.unsplash.com/photo-1546608235-3310a2494cdf?w=400',
    },
    {
      name: 'Ben Stokes',
      age: 32,
      role: 'All-rounder',
      bio: 'English all-rounder, one of the best all-format players in the world.',
      photoUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400',
    },
    {
      name: 'Kane Williamson',
      age: 33,
      role: 'Batsman',
      bio: 'New Zealand captain, known for classical batting and calm demeanor.',
      photoUrl: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=400',
    },
  ];

  for (const player of players) {
    await createPlayer(player);
  }
  
  console.log('Players seeded');
};

export const seedProducts = async () => {
  const products = [
    {
      title: 'Professional Cricket Bat',
      sku: 'BAT-001',
      price: 4999,
      inventory: 25,
      description: 'High-quality English willow cricket bat, perfect for professional players.',
      category: 'Equipment',
      images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400'],
      featured: true,
    },
    {
      title: 'Cricket Ball - Leather',
      sku: 'BALL-001',
      price: 499,
      inventory: 100,
      description: 'Premium leather cricket ball, regulation size and weight.',
      category: 'Equipment',
      images: ['https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400'],
      featured: true,
    },
    {
      title: 'Batting Gloves',
      sku: 'GLOVE-001',
      price: 1299,
      inventory: 50,
      description: 'Professional batting gloves with superior grip and protection.',
      category: 'Equipment',
      images: ['https://images.unsplash.com/photo-1546608235-3310a2494cdf?w=400'],
      featured: true,
    },
    {
      title: 'Cricket Jersey',
      sku: 'JERSEY-001',
      price: 899,
      inventory: 75,
      description: 'Official team jersey, breathable fabric, available in all sizes.',
      category: 'Apparel',
      images: ['https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=400'],
      featured: true,
    },
    {
      title: 'Cricket Helmet',
      sku: 'HELMET-001',
      price: 2499,
      inventory: 30,
      description: 'Safety-certified cricket helmet with comfortable padding.',
      category: 'Equipment',
      images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400'],
      featured: false,
    },
  ];

  for (const product of products) {
    await createProduct(product);
  }
  
  console.log('Products seeded');
};

export const seedNews = async () => {
  const newsAdmin = {
    id: 'admin-user',
    name: 'Admin',
  };

  const newsPosts = [
    {
      title: 'Historic Victory in the Final Match',
      excerpt: 'An incredible comeback led to a thrilling victory in the championship final.',
      content: 'The match saw an amazing display of skill and determination as the team fought back from a difficult position to secure a memorable win...',
      featuredImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
      tags: ['Match', 'Victory', 'Championship'],
      category: 'Match Results',
      type: 'news' as const,
    },
    {
      title: 'New Tournament Schedule Announced',
      excerpt: 'The upcoming season promises exciting matches with the newly announced tournament schedule.',
      content: 'Cricket fans have something to look forward to as the tournament schedule has been released...',
      featuredImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
      tags: ['Tournament', 'Schedule'],
      category: 'Announcements',
      type: 'news' as const,
    },
    {
      title: 'Record-Breaking Performance by Star Player',
      excerpt: 'A stunning individual performance has set a new record in international cricket.',
      content: 'In an extraordinary display of batting prowess, the star player has rewritten the record books...',
      featuredImage: 'https://images.unsplash.com/photo-1546608235-3310a2494cdf?w=800',
      tags: ['Records', 'Performance'],
      category: 'Player News',
      type: 'news' as const,
    },
  ];

  for (const post of newsPosts) {
    await createPost(post, newsAdmin.id, newsAdmin.name);
  }
  
  console.log('News posts seeded');
};

export const seedTournaments = async () => {
  const tournaments = [
    {
      name: 'Cricket Universe Championship 2024',
      description: 'Annual championship tournament featuring top teams from around the world.',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
    },
    {
      name: 'Summer League 2024',
      description: 'Exciting summer cricket league with fast-paced T20 matches.',
      startDate: '2024-06-01',
      endDate: '2024-07-15',
    },
    {
      name: 'Winter Cup 2024',
      description: 'Premier winter tournament showcasing emerging talent.',
      startDate: '2024-11-01',
      endDate: '2024-12-20',
    },
  ];

  for (const tournament of tournaments) {
    const tournamentId = await createTournament(tournament);
    
    // Add some fixtures for the first tournament
    if (tournament.name.includes('Championship')) {
      await createFixture({
        tournamentId,
        team1: 'Team A',
        team2: 'Team B',
        matchDate: '2024-03-10',
        venue: 'Stadium One',
      }, tournament.name);
      
      await createFixture({
        tournamentId,
        team1: 'Team C',
        team2: 'Team D',
        matchDate: '2024-03-12',
        venue: 'Stadium Two',
      }, tournament.name);
    }
  }
  
  console.log('Tournaments seeded');
};

export const seedAll = async () => {
  console.log('Starting database seed...');
  try {
    await seedForumCategories();
    await seedPlayers();
    await seedProducts();
    await seedNews();
    await seedTournaments();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
