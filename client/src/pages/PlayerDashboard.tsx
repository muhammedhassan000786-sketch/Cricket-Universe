import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Trophy, TrendingUp, Calendar, Award } from 'lucide-react';

export default function PlayerDashboard() {
  const { user } = useAuth();

  const { data: playerProfile } = useQuery({
    queryKey: ['/api/players/me'],
  });

  const stats = playerProfile?.stats || {
    matches: 0,
    runs: 0,
    wickets: 0,
    average: 0,
    strikeRate: 0,
    centuries: 0,
    halfCenturies: 0,
  };

  const statCards = [
    { title: 'Matches Played', value: stats.matches, icon: Trophy },
    { title: 'Total Runs', value: stats.runs, icon: TrendingUp },
    { title: 'Wickets Taken', value: stats.wickets, icon: Award },
    { title: 'Batting Average', value: stats.average.toFixed(2), icon: TrendingUp },
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-700 mb-2">Player Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {user?.username}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <Icon className="h-8 w-8 text-primary mb-3" />
                  <div className="text-3xl font-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Matches */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center py-8">
                  No recent matches
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Training Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Training Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center py-8">
                  No scheduled training sessions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Performance chart will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
