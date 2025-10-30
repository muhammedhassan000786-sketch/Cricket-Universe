import { Link, useLocation } from 'wouter';
import { ShoppingCart, Menu, Search, User, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LogoUpload } from './LogoUpload';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/players', label: 'Players' },
  { path: '/news', label: 'News' },
  { path: '/highlights', label: 'Highlights' },
  { path: '/tournaments', label: 'Tournaments' },
  { path: '/shop', label: 'Shop' },
  { path: '/membership', label: 'Membership' },
  { path: '/forum', label: 'Forum' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

export function Header() {
  const [location] = useLocation();
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [showLogoUpload, setShowLogoUpload] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      const settingsDoc = await getDoc(doc(db, 'settings', 'site'));
      if (settingsDoc.exists() && settingsDoc.data().logoUrl) {
        setLogoUrl(settingsDoc.data().logoUrl);
      }
    };
    fetchLogo();
  }, []);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {logoUrl ? (
            <Link href="/" data-testid="link-home">
              <img src={logoUrl} alt="Cricket Universe" className="h-10 w-auto" />
            </Link>
          ) : user?.role === 'admin' ? (
            <button
              onClick={() => setShowLogoUpload(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover-elevate px-3 py-2 rounded-md"
              data-testid="button-upload-logo"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Logo</span>
            </button>
          ) : (
            <Link href="/" className="text-xl font-800 text-primary" data-testid="link-home">
              Cricket Universe
            </Link>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`px-3 py-2 text-sm font-600 transition-colors hover-elevate rounded-md ${
                location === link.path
                  ? 'text-primary'
                  : 'text-foreground/80'
              }`}
              data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            data-testid="button-search"
            className="hidden md:flex"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            data-testid="button-cart"
            asChild
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-600">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="button-user-menu"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" data-testid="link-profile">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" data-testid="link-admin">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.role === 'player' && (
                  <DropdownMenuItem asChild>
                    <Link href="/player-dashboard" data-testid="link-player-dashboard">
                      Player Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} data-testid="button-signout">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" data-testid="button-login" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button data-testid="button-signup" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    href={link.path}
                    className={`text-sm font-600 hover-elevate px-4 py-2 rounded-md ${
                      location === link.path
                        ? 'text-primary bg-accent'
                        : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {!user && (
                  <>
                    <Button variant="outline" className="w-full" data-testid="button-mobile-login" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button className="w-full" data-testid="button-mobile-signup" asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Dialog open={showLogoUpload} onOpenChange={setShowLogoUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Website Logo</DialogTitle>
          </DialogHeader>
          <LogoUpload onSuccess={(url) => {
            setLogoUrl(url);
            setShowLogoUpload(false);
          }} />
        </DialogContent>
      </Dialog>
    </header>
  );
}
