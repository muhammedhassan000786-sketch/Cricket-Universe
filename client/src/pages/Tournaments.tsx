import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Calendar } from 'lucide-react';
import { Link } from 'wouter';

export default function Tournaments() {
  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['/api/tournaments'],
  });

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-700 mb-4">Tournaments & Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore upcoming and ongoing cricket tournaments
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-muted animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : tournaments?.length === 0 ? (
          <Card className="p-12 text-center">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-600 mb-2">No tournaments yet</h3>
            <p className="text-muted-foreground">
              Check back soon for upcoming tournaments
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments?.map((tournament: any) => (
              <Link key={tournament.id} href={`/tournaments/${tournament.slug}`}>
                <Card className="overflow-hidden hover-elevate cursor-pointer h-full">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    {tournament.logoUrl ? (
                      <img
                        src={tournament.logoUrl}
                        alt={tournament.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Trophy className="h-16 w-16 text-primary" />
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-600 mb-2">{tournament.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tournament.description}
                    </p>
                    <div className="mt-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-600 ${
                        tournament.status === 'ongoing'
                          ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                          : tournament.status === 'upcoming'
                          ? 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400'
                          : 'bg-gray-100 dark:bg-gray-950/30 text-gray-700 dark:text-gray-400'
                      }`}>
                        {tournament.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
