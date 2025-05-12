import React from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  [x: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex flex-col items-center justify-center">
          <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl animate-pulse">
            EP
          </div>
          <div className="mt-4 text-lg font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute; 