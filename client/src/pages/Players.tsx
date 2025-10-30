import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

export default function Players() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: players, isLoading } = useQuery({
    queryKey: ['/api/players'],
  });

  const filteredPlayers = players?.filter((player: any) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.role.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-700 mb-4">Player Profiles</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Meet our talented cricket players with detailed stats and performance history
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search players by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-players"
            />
          </div>
        </div>

        {/* Players Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[3/4] bg-muted animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPlayers.length === 0 ? (
          <Card className="p-12 text-center">
            <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-600 mb-2">No players found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? 'Try adjusting your search query'
                : 'No players have been added yet'}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlayers.map((player: any) => (
              <Link key={player.id} href={`/players/${player.slug}`}>
                <Card className="overflow-hidden hover-elevate transition-all cursor-pointer group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {player.photoUrl ? (
                      <img
                        src={player.photoUrl}
                        alt={player.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <User className="h-24 w-24 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl md:text-2xl font-700 text-white mb-1">
                        {player.name}
                      </h3>
                      <p className="text-sm text-white/90">{player.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Matches</div>
                        <div className="text-lg font-700">{player.stats?.matches || 0}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Runs</div>
                        <div className="text-lg font-700">{player.stats?.runs || 0}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Wickets</div>
                        <div className="text-lg font-700">{player.stats?.wickets || 0}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Average</div>
                        <div className="text-lg font-700">{player.stats?.average || 0}</div>
                      </div>
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
