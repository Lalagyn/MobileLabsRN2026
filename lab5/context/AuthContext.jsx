import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(undefined);

const initialUsers = [
  {
    name: 'Віталій',
    email: 'ipz_222@student.ztu.ude.ua',
    password: '123456',
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      return {
        success: false,
        message: 'Заповніть електронну пошту та пароль.',
      };
    }

    const user = users.find(
      (item) => item.email.toLowerCase() === normalizedEmail && item.password === normalizedPassword
    );

    if (!user) {
      return {
        success: false,
        message: 'Невірна електронна пошта або пароль.',
      };
    }

    setCurrentUser(user);

    return {
      success: true,
    };
  };

  const register = (email, password, confirmPassword, name) => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const normalizedConfirmPassword = confirmPassword.trim();

    if (!normalizedName || !normalizedEmail || !normalizedPassword || !normalizedConfirmPassword) {
      return {
        success: false,
        message: 'Заповніть усі поля форми.',
      };
    }

    if (normalizedPassword.length < 6) {
      return {
        success: false,
        message: 'Пароль має містити щонайменше 6 символів.',
      };
    }

    if (normalizedPassword !== normalizedConfirmPassword) {
      return {
        success: false,
        message: 'Паролі не збігаються.',
      };
    }

    const userExists = users.some((item) => item.email.toLowerCase() === normalizedEmail);

    if (userExists) {
      return {
        success: false,
        message: 'Користувач із такою електронною поштою вже існує.',
      };
    }

    const newUser = {
      name: normalizedName,
      email: normalizedEmail,
      password: normalizedPassword,
    };

    setUsers((prevState) => [...prevState, newUser]);
    setCurrentUser(newUser);

    return {
      success: true,
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(currentUser),
      currentUser,
      login,
      register,
      logout,
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth має використовуватися всередині AuthProvider');
  }

  return context;
}
