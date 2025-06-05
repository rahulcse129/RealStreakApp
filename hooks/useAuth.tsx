import { useState, useEffect, createContext, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Mock storage for web platform
const webStorage = new Map<string, string>();

interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage helper functions
async function saveItem(key: string, value: string) {
  if (Platform.OS === 'web') {
    webStorage.set(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return webStorage.get(key) || null;
  }
  return await SecureStore.getItemAsync(key);
}

async function removeItem(key: string) {
  if (Platform.OS === 'web') {
    webStorage.delete(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from storage on mount
    const loadUser = async () => {
      const userJson = await getItem('user');
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // In a real app, you would validate credentials with a server
      // For demo purposes, we'll accept any credentials
      
      // Mock successful login for demo purposes
      if (!email || !password) return false;
      
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      
      await saveItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // In a real app, you would register with a server
      // For demo purposes, we'll accept any valid input
      
      if (!name || !email || !password) return false;
      
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
      };
      
      await saveItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for easy context use
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}