import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user roles
export type UserRole = 'student' | 'teacher' | null;

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscriptionType: 'free' | 'basic' | 'premium';
  avatar?: string;
}

// Auth context state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth context actions
interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole, subscriptionType: 'free' | 'basic' | 'premium') => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

// Combined auth context type
type AuthContextType = AuthState & AuthActions;

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props interface
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create the auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the token with the server
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          setAuthState({
            user: JSON.parse(storedUser),
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to authenticate',
        });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setAuthState({ ...authState, isLoading: true, error: null });
    
    try {
      // Mock API call - replace with actual API call
      // In a real app, this would be a fetch/axios call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email,
        role: 'student', // Default role, would come from the backend
        subscriptionType: 'basic',
        avatar: '',
      };
      
      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Update state
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: 'Invalid email or password',
      });
    }
  };

  // Sign up function
  const signup = async (name: string, email: string, password: string, role: UserRole, subscriptionType: 'free' | 'basic' | 'premium') => {
    setAuthState({ ...authState, isLoading: true, error: null });
    
    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser: User = {
        id: '1',
        name,
        email,
        role,
        subscriptionType,
        avatar: '',
      };
      
      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Update state
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: 'Failed to create account',
      });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    setAuthState({ ...authState, isLoading: true, error: null });
    
    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user in local storage
      const updatedUser = { ...authState.user, ...userData } as User;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update state
      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: 'Failed to update profile',
      });
    }
  };

  // Clear error function
  const clearError = () => {
    setAuthState({ ...authState, error: null });
  };

  // Value to be provided to consumers
  const value = {
    ...authState,
    login,
    signup,
    logout,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 