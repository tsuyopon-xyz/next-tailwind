import { useEffect } from 'react';
import firebase from 'firebase/app';
import { User } from 'models/User';
import { atom, useRecoilState } from 'recoil';

const userState = atom<User>({
  key: 'user',
  default: null,
});

export function useAuthentication() {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    if (user !== null) {
      return;
    }

    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        // Handle Errors here.
        console.error(error);
      });

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        const loginUser = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
        };

        setUser(loginUser);
        createUserIfNotFound(loginUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return { user };
}

async function createUserIfNotFound(user: User) {
  const userRef = firebase.firestore().collection('users').doc(user.uid);
  const doc = await userRef.get();
  if (doc.exists) {
    return;
  }

  // "AU" stands for "Anonymous User".
  await userRef.set({
    id: user.uid,
    name: 'AU-' + new Date().getTime(),
  });
}
