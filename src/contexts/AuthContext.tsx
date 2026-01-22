import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, onIdTokenChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { tokenService } from '@/services/api/tokenService';
import { getAuth } from '@/store/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const idToken = await currentUser.getIdToken();
        await dispatch(getAuth(idToken) as any).unwrap();
        setUser(currentUser);
      } catch (error) {
        void error;
        await auth.signOut();
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      if (!currentUser) {
        await tokenService.clear();
        return;
      }

      const idToken = await currentUser.getIdToken();
      await tokenService.setToken(idToken);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

