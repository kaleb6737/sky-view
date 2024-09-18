import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from './firebase'; // Ensure Firebase is properly imported
import { User } from 'firebase/auth';

// Define the shape of the context state
interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Helper functions for auth actions
  const login = async (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    return auth.signOut();
  };

  const register = async (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const value = {
    currentUser,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
