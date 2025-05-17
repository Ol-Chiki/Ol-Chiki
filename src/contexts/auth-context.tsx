
'use client';

import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type UserCredential,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<UserCredential | null>;
  signUpWithEmail: (email: string, pass: string) => Promise<UserCredential | null>;
  signInWithEmail: (email: string, pass: string) => Promise<UserCredential | null>;
  logOut: () => Promise<void>;
  hasSkippedAuth: boolean;
  skipAuth: () => void;
  clearSkipAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasSkippedAuth, setHasSkippedAuth] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedSkipStatus = localStorage.getItem('hasSkippedAuth');
    if (storedSkipStatus === 'true') {
      setHasSkippedAuth(true);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        // If user logs in, clear the skip status
        localStorage.removeItem('hasSkippedAuth');
        setHasSkippedAuth(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<UserCredential | null> => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast({ title: 'Signed in successfully!', description: `Welcome ${result.user.displayName || result.user.email}!` });
      router.push('/');
      return result;
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast({ title: 'Google Sign-In Error', description: error.message || 'Failed to sign in with Google.', variant: 'destructive' });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string): Promise<UserCredential | null> => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      setUser(result.user);
      toast({ title: 'Signed up successfully!', description: `Welcome ${result.user.email}!` });
      router.push('/');
      return result;
    } catch (error: any) {
      console.error('Email sign-up error:', error);
      toast({ title: 'Email Sign-Up Error', description: error.message || 'Failed to sign up.', variant: 'destructive' });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const signInWithEmail = async (email: string, pass: string): Promise<UserCredential | null> => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      setUser(result.user);
      toast({ title: 'Signed in successfully!', description: `Welcome back ${result.user.email}!` });
      router.push('/');
      return result;
    } catch (error: any) {
      console.error('Email sign-in error:', error);
      toast({ title: 'Email Sign-In Error', description: error.message || 'Failed to sign in.', variant: 'destructive' });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      toast({ title: 'Signed out', description: 'You have been signed out.' });
      router.push('/auth'); // Redirect to auth page on logout
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({ title: 'Sign Out Error', description: error.message || 'Failed to sign out.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const skipAuth = () => {
    localStorage.setItem('hasSkippedAuth', 'true');
    setHasSkippedAuth(true);
    router.push('/');
  };

  const clearSkipAuth = () => {
    localStorage.removeItem('hasSkippedAuth');
    setHasSkippedAuth(false);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signUpWithEmail, signInWithEmail, logOut, hasSkippedAuth, skipAuth, clearSkipAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
