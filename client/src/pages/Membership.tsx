import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Crown, Sparkles } from 'lucide-react';
import { membershipTiers } from '@shared/schema';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'wouter';

export default function Membership() {
  const { user } = useAuth();

  const tiers = [
    {
      id: 'free',
      name: membershipTiers.free.name,
      price: membershipTiers.free.price,
      features: membershipTiers.free.features,
      icon: Star,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
    },
    {
      id: 'silver',
      name: membershipTiers.silver.name,
      price: membershipTiers.silver.price,
      features: membershipTiers.silver.features,
      icon: Sparkles,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      popular: true,
    },
    {
      id: 'gold',
      name: membershipTiers.gold.name,
      price: membershipTiers.gold.price,
      features: membershipTiers.gold.features,
      icon: Crown,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
    },
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-700 mb-4">
            Cricket Universe Membership
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a membership plan that fits your cricket passion. Get exclusive access to premium content and special perks.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isCurrentTier = user?.membershipTier === tier.id;

            return (
              <Card
                key={tier.id}
                className={`relative ${tier.popular ? 'border-primary border-2 scale-105' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-600">
                    Most Popular
                  </div>
                )}
                <CardHeader className={`pb-8 ${tier.bgColor} rounded-t-lg`}>
                  <div className="flex items-center justify-center mb-4">
                    <Icon className={`h-12 w-12 ${tier.color}`} />
                  </div>
                  <CardTitle className="text-2xl text-center">{tier.name}</CardTitle>
                  <CardDescription className="text-center">
                    {tier.price === 0 ? (
                      <span className="text-3xl font-800 text-foreground">Free</span>
                    ) : (
                      <>
                        <span className="text-3xl font-800 text-foreground">₹{tier.price}</span>
                        <span className="text-muted-foreground">/year</span>
                      </>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {user ? (
                    isCurrentTier ? (
                      <Button className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : (
                      <Button className="w-full" data-testid={`button-select-${tier.id}`}>
                        {tier.price === 0 ? 'Downgrade' : 'Upgrade'}
                      </Button>
                    )
                  ) : (
                    <Link href="/signup">
                      <Button className="w-full" data-testid={`button-signup-${tier.id}`}>
                        Get Started
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-card rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-700 mb-8 text-center">
            Why Join Cricket Universe?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Exclusive Content',
                description: 'Access to premium articles, videos, and player insights',
              },
              {
                title: 'Special Discounts',
                description: 'Save on cricket equipment and merchandise',
              },
              {
                title: 'Early Access',
                description: 'Be the first to book tickets for matches and events',
              },
              {
                title: 'Community',
                description: 'Connect with cricket enthusiasts worldwide',
              },
              {
                title: 'Live Streaming',
                description: 'Watch matches live (Gold membership)',
              },
              {
                title: 'Player Interactions',
                description: 'Direct access to Q&A with cricket stars',
              },
            ].map((benefit, index) => (
              <div key={index} className="p-6 rounded-lg bg-muted/50">
                <h3 className="font-600 mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
