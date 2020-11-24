import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import firebase from 'firebase/app';
import { User } from 'models/User';

type Query = {
  uid: string;
};

export default function UserShow() {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();
  const query = router.query as Query;

  useEffect(() => {
    async function loadUser() {
      if (query.uid === undefined) {
        return;
      }

      const doc = await firebase
        .firestore()
        .collection('users')
        .doc(query.uid)
        .get();

      if (!doc.exists) {
        return;
      }

      const gotUser = doc.data() as User;
      gotUser.uid = doc.id;
      setUser(gotUser);
    }
    loadUser();
  }, [query.uid]);

  return (
    <div>
      <div>{user ? user.name : 'ロード中…'}</div>
      <Link href="/">
        <a>Go back</a>
      </Link>
    </div>
  );
}
