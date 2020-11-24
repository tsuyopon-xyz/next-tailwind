import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { User } from 'models/User';
import Button from 'components/Button';
import { toast } from 'react-toastify';

type Query = {
  uid: string;
};

export default function UserShow() {
  const [user, setUser] = useState<User>(null);
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);

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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // textareaのrequireが効かなかったとき用のブロック
    if (!body) {
      alert('入力してください');
      return;
    }

    setIsSending(true);

    await firebase.firestore().collection('questions').add({
      senderUid: firebase.auth().currentUser.uid,
      receiverUid: user.uid,
      body,
      isReplied: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setIsSending(false);

    setBody('');
    // alert('質問を送信しました。');
    toast.success('質問を送信しました。', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      {user && (
        <>
          <div className="text-center">
            <h1 className="text-3xl">{user.name}さんのページ</h1>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 max-w-lg mx-auto">
            <form action="#" method="POST" onSubmit={onSubmit}>
              <div className="shadow tablet:rounded-md tablet:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 tablet:p-6">
                  <div>
                    <label
                      htmlFor="askBox"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {user.name}さんに質問しよう！
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="askBox"
                        rows={10}
                        className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full tablet:text-sm border border-gray-300 rounded-md"
                        placeholder="ここに入力"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="text-center">
                      {!isSending ? (
                        <Button
                          title="ここに質問を入力する"
                          type="submit"
                          disabled={isSending || body.trim().length === 0}
                        />
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 m-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 focus:border-indigo-700 active:bg-indigo-700 transition ease-in-out duration-150 cursor-not-allowed opacity-70"
                          disabled
                        >
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
