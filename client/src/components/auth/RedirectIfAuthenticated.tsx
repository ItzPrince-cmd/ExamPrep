import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';

interface RedirectIfAuthenticatedProps {
  component: React.ComponentType<any>;
  [x: string]: any;
}

const RedirectIfAuthenticated: React.FC<RedirectIfAuthenticatedProps> = ({ 
  component: Component, 
  ...rest 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation('/dashboard');
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

  if (isAuthenticated) {
    return null;
  }

  return <Component {...rest} />;
};

export default RedirectIfAuthenticated; 