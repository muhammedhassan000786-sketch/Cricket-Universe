import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { MessageSquare, Eye, Clock, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Forum() {
  const { user } = useAuth();
  const { data: categories, isLoading } = useQuery({
    queryKey: ['/api/forum/categories'],
  });

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-700 mb-2">Community Forum</h1>
            <p className="text-lg text-muted-foreground">
              Discuss cricket with fans from around the world
            </p>
          </div>
          {user && (
            <Link href="/forum/new-thread">
              <Button data-testid="button-new-thread">
                <Plus className="mr-2 h-4 w-4" />
                New Thread
              </Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {categories?.length === 0 ? (
              <Card className="col-span-2 p-12 text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-600 mb-2">No categories yet</h3>
                <p className="text-muted-foreground">
                  Forum categories will appear here
                </p>
              </Card>
            ) : (
              categories?.map((category: any) => (
                <Link key={category.id} href={`/forum/${category.slug}`}>
                  <Card className="hover-elevate cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-600 mb-1">{category.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {category.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{category.threadCount || 0} threads</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        )}

        {/* Recent Threads */}
        <div className="mt-12">
          <h2 className="text-2xl font-700 mb-6">Recent Discussions</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 border-b last:border-0"
                  >
                    <div className="flex-1">
                      <h4 className="font-600 mb-1">Loading thread...</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by User</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>2 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>0</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
