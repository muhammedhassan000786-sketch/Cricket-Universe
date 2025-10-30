import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Play, Trophy, Users, ShoppingBag, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data: latestNews } = useQuery({
    queryKey: ['/api/news/latest'],
  });

  const { data: upcomingFixtures } = useQuery({
    queryKey: ['/api/fixtures/upcoming'],
  });

  const { data: featuredProducts } = useQuery({
    queryKey: ['/api/products/featured'],
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920')] bg-cover bg-center opacity-10 dark:opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-gray-900/90" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full backdrop-blur-sm border border-green-300/30">
            <span className="text-sm font-600 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              🏏 Your Ultimate Cricket Destination
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-800 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Cricket Universe
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Your ultimate destination for cricket news, player profiles, match highlights, and premium cricket gear
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link href="/players">
              <Button size="lg" className="text-base bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all" data-testid="button-explore-players">
                Explore Players
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline" className="text-base border-2 hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 transition-all" data-testid="button-shop-now">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News Ticker */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-[length:200%_auto] animate-gradient text-white py-3 overflow-hidden shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="font-700 text-sm whitespace-nowrap flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              BREAKING NEWS
            </span>
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-sm">
                Latest updates from Cricket Universe • New tournament announced • Exclusive player interviews available • Shop new merchandise
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Users, label: 'Players', value: '50+' },
              { icon: Trophy, label: 'Tournaments', value: '15+' },
              { icon: Play, label: 'Match Highlights', value: '200+' },
              { icon: ShoppingBag, label: 'Products', value: '100+' },
            ].map((stat, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-700">Latest News</h2>
            <Link href="/news">
              <Button variant="ghost" data-testid="button-view-all-news">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* News cards will be loaded here */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover-elevate">
                <div className="aspect-video bg-muted" />
                <CardContent className="p-6">
                  <div className="text-xs text-muted-foreground mb-2">News • 2 hours ago</div>
                  <h3 className="text-xl font-600 mb-2 line-clamp-2">
                    Loading latest cricket news...
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    Stay tuned for the latest updates from the cricket world.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-700">Featured Match Highlight</h2>
            <Link href="/highlights">
              <Button variant="ghost" data-testid="button-view-all-highlights">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <Play className="h-20 w-20 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Upcoming Fixtures */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-700">Upcoming Fixtures</h2>
            <Link href="/fixtures">
              <Button variant="ghost" data-testid="button-view-all-fixtures">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">TBA</div>
                        <div className="font-600">VS</div>
                      </div>
                      <div>
                        <div className="font-600 mb-1">Match {i}</div>
                        <div className="text-sm text-muted-foreground">Loading...</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-700">Featured Products</h2>
            <Link href="/shop">
              <Button variant="ghost" data-testid="button-view-all-products">
                Shop All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden hover-elevate">
                <div className="aspect-square bg-muted" />
                <CardContent className="p-4">
                  <h3 className="font-600 mb-1 line-clamp-2">Product {i}</h3>
                  <div className="text-lg font-700 text-primary">₹999</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Star className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-800 mb-6">
            Join Cricket Universe Membership
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Get exclusive access to premium content, discounts, and special perks
          </p>
          <Link href="/membership">
            <Button size="lg" variant="secondary" className="text-base" data-testid="button-join-membership">
              Explore Membership Plans
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
