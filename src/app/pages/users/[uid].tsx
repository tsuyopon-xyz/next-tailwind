import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import QuestionForm from 'components/QuestionForm';
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
    <>
      {user && (
        <>
          <div className="text-center">
            <h1 className="text-3xl">{user.name}さんのページ</h1>
            <QuestionForm user={user} />
          </div>
        </>
      )}
    </>
  );
}
