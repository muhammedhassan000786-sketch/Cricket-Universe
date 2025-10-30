import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Package, FileText, Trophy, MessageSquare, ShoppingCart, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';

export default function AdminDashboard() {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['/api/admin/stats'],
  });

  const quickActions = [
    { icon: Users, label: 'Manage Players', href: '/admin/players', color: 'text-blue-600' },
    { icon: Package, label: 'Manage Products', href: '/admin/products', color: 'text-green-600' },
    { icon: FileText, label: 'Manage Posts', href: '/admin/posts', color: 'text-purple-600' },
    { icon: Trophy, label: 'Manage Tournaments', href: '/admin/tournaments', color: 'text-yellow-600' },
    { icon: MessageSquare, label: 'Moderate Forum', href: '/admin/forum', color: 'text-pink-600' },
    { icon: ShoppingCart, label: 'View Orders', href: '/admin/orders', color: 'text-orange-600' },
  ];

  const statCards = [
    { title: 'Total Users', value: stats?.users || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/20' },
    { title: 'Total Products', value: stats?.products || 0, icon: Package, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950/20' },
    { title: 'Pending Orders', value: stats?.pendingOrders || 0, icon: ShoppingCart, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/20' },
    { title: 'Total Players', value: stats?.players || 0, icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/20' },
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-700 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {user?.username}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className={`p-6 ${stat.bg}`}>
                  <div className="flex items-center gap-4">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                    <div>
                      <div className="text-2xl font-800">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={index} href={action.href}>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-auto py-4 hover-elevate"
                      data-testid={`button-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Icon className={`h-5 w-5 mr-3 ${action.color}`} />
                      {action.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center py-8">
                  No recent orders
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Forum Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center py-8">
                  No recent activity
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
