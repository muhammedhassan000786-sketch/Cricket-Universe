import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, Globe, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-700 mb-6">About Cricket Universe</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are passionate about bringing cricket fans closer to the game they love. 
            Cricket Universe is your one-stop destination for everything cricket - from the latest news 
            to player stats, match highlights, and premium cricket gear.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Trophy,
              title: 'Excellence',
              description: 'We strive for excellence in everything we do, from content quality to user experience',
            },
            {
              icon: Users,
              title: 'Community',
              description: 'Building a global community of cricket enthusiasts who share the passion for the game',
            },
            {
              icon: Globe,
              title: 'Global Reach',
              description: 'Connecting cricket fans worldwide with comprehensive coverage and updates',
            },
            {
              icon: Heart,
              title: 'Passion',
              description: 'Driven by our love for cricket and commitment to serving the cricket community',
            },
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="text-center hover-elevate">
                <CardContent className="p-6">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-600 mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Our Story */}
        <Card className="mb-16">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-700 mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Cricket Universe was born from a simple idea: to create a comprehensive platform 
                that brings together everything a cricket fan needs in one place. Founded by cricket 
                enthusiasts, we understand the passion and dedication that fans have for the game.
              </p>
              <p>
                What started as a small project has grown into a thriving community of cricket lovers 
                from around the world. We provide the latest news, in-depth player profiles, exciting 
                match highlights, and a curated selection of cricket equipment and merchandise.
              </p>
              <p>
                Our mission is to celebrate cricket in all its forms - from the grassroots level to 
                international tournaments. We believe in making cricket accessible to everyone and 
                fostering a community where fans can connect, discuss, and share their love for the game.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Users', value: '10,000+' },
            { label: 'Player Profiles', value: '50+' },
            { label: 'Match Highlights', value: '200+' },
            { label: 'Products', value: '100+' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-card">
              <div className="text-4xl font-800 text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
