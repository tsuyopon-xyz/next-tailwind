import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { User } from 'models/User';
import Button from 'components/Button';

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
    <div className="container mx-auto bg-red-100">
      <div>{user ? user.name : 'ロード中…'}</div>
      <Button title="ボタン" />
    </div>
  );
}
