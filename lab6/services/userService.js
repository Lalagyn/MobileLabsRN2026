import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, getFirebaseConfigError, isFirebaseConfigured } from '../firebase/config';

function ensureFirestoreReady() {
  if (!isFirebaseConfigured || !auth || !db) {
    throw new Error(getFirebaseConfigError());
  }
}

function ensureCurrentUserAccess(uid) {
  ensureFirestoreReady();

  if (!auth.currentUser || auth.currentUser.uid !== uid) {
    throw new Error('Доступ дозволено лише до власного документа користувача.');
  }
}

export async function createEmptyUserProfile(uid, email = '') {
  ensureCurrentUserAccess(uid);

  await setDoc(
    doc(db, 'users', uid),
    {
      name: '',
      age: null,
      city: '',
      email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function ensureUserProfileDocument(uid, email = '') {
  ensureCurrentUserAccess(uid);

  const documentRef = doc(db, 'users', uid);
  const documentSnapshot = await getDoc(documentRef);

  if (!documentSnapshot.exists()) {
    await setDoc(
      documentRef,
      {
        name: '',
        age: null,
        city: '',
        email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }
}

export async function getUserProfile(uid) {
  ensureCurrentUserAccess(uid);
  await ensureUserProfileDocument(uid, auth.currentUser?.email ?? '');

  const documentSnapshot = await getDoc(doc(db, 'users', uid));
  return documentSnapshot.exists() ? documentSnapshot.data() : null;
}

export async function saveUserProfile(uid, profile) {
  ensureCurrentUserAccess(uid);
  await ensureUserProfileDocument(uid, profile.email ?? '');

  await setDoc(
    doc(db, 'users', uid),
    {
      ...profile,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function deleteUserProfile(uid) {
  ensureCurrentUserAccess(uid);
  await deleteDoc(doc(db, 'users', uid));
}
