import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/pages/Login';

export function LoginRoute() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        setLocation('/admin');
      } else if (user.role === 'player') {
        setLocation('/player-dashboard');
      } else {
        setLocation('/');
      }
    }
  }, [user, setLocation]);

  if (user) return null;
  
  return <Login />;
}
