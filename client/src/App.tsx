import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoginRoute } from "@/components/LoginRoute";
import { SignupRoute } from "@/components/SignupRoute";
import { useEffect } from "react";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Players from "@/pages/Players";
import Shop from "@/pages/Shop";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Membership from "@/pages/Membership";
import Forum from "@/pages/Forum";
import News from "@/pages/News";
import Blog from "@/pages/Blog";
import Tournaments from "@/pages/Tournaments";
import MatchHighlights from "@/pages/MatchHighlights";
import AdminDashboard from "@/pages/AdminDashboard";
import PlayerDashboard from "@/pages/PlayerDashboard";
import NotFound from "@/pages/NotFound";

function ProtectedRoute({ component: Component, role }: { component: any; role?: string }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setLocation('/login');
    } else if (!loading && role && user?.role !== role) {
      setLocation('/');
    }
  }, [user, loading, role, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || (role && user.role !== role)) {
    return null;
  }

  return <Component />;
}

// Wrapper component for protected checkout route
function CheckoutRoute() {
  return <ProtectedRoute component={Checkout} />;
}

// Wrapper component for admin route
function AdminRoute() {
  return <ProtectedRoute component={AdminDashboard} role="admin" />;
}

// Wrapper component for player dashboard route
function PlayerDashboardRoute() {
  return <ProtectedRoute component={PlayerDashboard} role="player" />;
}

function Router() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Switch>
          {/* Public Routes */}
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/players" component={Players} />
          <Route path="/shop" component={Shop} />
          <Route path="/cart" component={Cart} />
          <Route path="/membership" component={Membership} />
          <Route path="/forum" component={Forum} />
          <Route path="/news" component={News} />
          <Route path="/blog" component={Blog} />
          <Route path="/tournaments" component={Tournaments} />
          <Route path="/highlights" component={MatchHighlights} />
          
          {/* Auth Routes */}
          <Route path="/login" component={LoginRoute} />
          <Route path="/signup" component={SignupRoute} />
          
          {/* Protected Routes */}
          <Route path="/checkout" component={CheckoutRoute} />
          <Route path="/admin" component={AdminRoute} />
          <Route path="/player-dashboard" component={PlayerDashboardRoute} />
          
          {/* 404 Fallback */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
