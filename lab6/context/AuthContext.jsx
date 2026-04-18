import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  deleteCurrentUserAccount,
  loginUser,
  logoutUser,
  onAuthUserChanged,
  registerUser,
  resetUserPassword,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthUserChanged((authUser) => {
      console.log('onAuthStateChanged user:', authUser);
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      login: loginUser,
      register: registerUser,
      logout: logoutUser,
      resetPassword: resetUserPassword,
      deleteAccount: deleteCurrentUserAccount,
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
