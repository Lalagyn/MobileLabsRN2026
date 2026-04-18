import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, getFirebaseConfigError, isFirebaseConfigured } from '../firebase/config';
import {
  createEmptyUserProfile,
  deleteUserProfile,
  ensureUserProfileDocument,
} from './userService';

const AUTH_ERROR_MESSAGES = {
  'auth/email-already-in-use': 'Користувач з таким email уже існує.',
  'auth/invalid-email': 'Некоректна email-адреса.',
  'auth/user-not-found': 'Користувача з таким email не знайдено.',
  'auth/wrong-password': 'Неправильний пароль.',
  'auth/invalid-credential': 'Неправильний email або пароль.',
  'auth/weak-password': 'Пароль має містити щонайменше 6 символів.',
  'auth/too-many-requests': 'Забагато спроб. Спробуйте пізніше.',
  'auth/requires-recent-login': 'Для видалення акаунта потрібно повторно увійти.',
  'auth/network-request-failed': "Немає з'єднання з мережею. Спробуйте ще раз.",
  'auth/operation-not-allowed': 'У Firebase не увімкнено Email/Password Authentication.',
};

function mapAuthError(error) {
  return new Error(
    AUTH_ERROR_MESSAGES[error?.code] ?? error?.message ?? 'Сталася помилка під час роботи з авторизацією.',
  );
}

function ensureFirebaseAuthReady() {
  if (!isFirebaseConfigured || !auth) {
    throw new Error(getFirebaseConfigError());
  }
}

async function syncUserProfileAfterAuth(user, email) {
  try {
    const normalizedEmail = user?.email ?? email ?? '';

    if (!user?.uid) {
      return;
    }

    await ensureUserProfileDocument(user.uid, normalizedEmail);
  } catch (error) {
    console.warn('Firestore profile sync failed after auth:', error);
  }
}

export function onAuthUserChanged(callback) {
  if (!isFirebaseConfigured || !auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
}

export async function registerUser(email, password) {
  try {
    ensureFirebaseAuthReady();
    const credentials = await createUserWithEmailAndPassword(auth, email, password);

    try {
      await createEmptyUserProfile(credentials.user.uid, email);
    } catch (error) {
      console.warn('Initial Firestore profile creation failed after registration:', error);
    }

    return credentials.user;
  } catch (error) {
    console.log('registerUser error:', error);

    if (error instanceof Error && !error.code) {
      throw error;
    }

    throw mapAuthError(error);
  }
}

export async function loginUser(email, password) {
  try {
    ensureFirebaseAuthReady();
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    await syncUserProfileAfterAuth(credentials.user, email);
    return credentials.user;
  } catch (error) {
    console.log('loginUser error:', error);

    if (error instanceof Error && !error.code) {
      throw error;
    }

    throw mapAuthError(error);
  }
}

export async function logoutUser() {
  try {
    ensureFirebaseAuthReady();
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error && !error.code) {
      throw error;
    }

    throw mapAuthError(error);
  }
}

export async function resetUserPassword(email) {
  try {
    ensureFirebaseAuthReady();
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error instanceof Error && !error.code) {
      throw error;
    }

    throw mapAuthError(error);
  }
}

export async function deleteCurrentUserAccount(password) {
  try {
    ensureFirebaseAuthReady();

    const normalizedPassword = password?.trim();

    if (!normalizedPassword) {
      throw new Error('Введіть пароль для підтвердження видалення акаунта.');
    }

    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.email) {
      throw new Error('Не вдалося отримати поточного користувача.');
    }

    const credential = EmailAuthProvider.credential(currentUser.email, normalizedPassword);

    await reauthenticateWithCredential(currentUser, credential);
    await deleteUserProfile(currentUser.uid);
    await deleteUser(currentUser);
  } catch (error) {
    console.warn('deleteCurrentUserAccount failed:', error);

    if (error instanceof Error && !error.code) {
      throw error;
    }

    throw mapAuthError(error);
  }
}
