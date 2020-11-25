import {
  useCallback,
  useState,
  useEffect,
  useRef,
  SetStateAction,
} from 'react';
import firebase from 'firebase/app';
import { User } from 'models/User';
import { Question } from 'models/Question';
import { useAuthentication } from 'hooks/authentication';
import QuestionCard from 'components/QuestionCard';

export default function QuestionsReceived() {
  const { user } = useAuthentication();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isPaginationFinished, setIsPaginationFinished] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const scrollContainerRef = useRef(null);

  const onScroll = async (_event: Event) => {
    if (isPaginationFinished) {
      return;
    }

    const container = scrollContainerRef.current;
    if (container === null) {
      return;
    }

    const rect = container.getBoundingClientRect();
    if (rect.top + rect.height > window.innerHeight) {
      return;
    }

    if (!isFetching) {
      setIsFetching(true);
      await loadNextQuestions(
        questions,
        user,
        setQuestions,
        setIsPaginationFinished
      );
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }

    // 初回読み込み時のみ処理
    if (questions.length === 0 && !isFetching) {
      loadQuestions(user, setQuestions, setIsPaginationFinished);
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [
    questions,
    // scrollContainerRef.current,
    isPaginationFinished,
    isFetching,
    user,
  ]);

  return (
    <div>
      <h1>質問一覧</h1>

      <main
        className="px-10 pt-10 max-w-screen-desktop mx-auto"
        ref={scrollContainerRef}
      >
        {/* <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-0"> */}
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
        {/* </div> */}
      </main>
    </div>
  );
}

function createBaseQuery(user: User) {
  return firebase
    .firestore()
    .collection('questions')
    .where('receiverUid', '==', user.uid)
    .orderBy('createdAt', 'desc')
    .limit(1);
}

function appendQuestions(
  snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>,
  setter: React.Dispatch<SetStateAction<Question[]>>
) {
  const gotQuestions = snapshot.docs.map((doc) => {
    const question = doc.data() as Question;
    question.id = doc.id;
    return question;
  });

  setter((prevQuestions) => {
    return [...prevQuestions, ...gotQuestions];
  });
}

async function loadQuestions(
  user: User,
  setterForQuestions: React.Dispatch<SetStateAction<Question[]>>,
  setterForPaginationFlag: React.Dispatch<SetStateAction<boolean>>
) {
  const snapshot = await createBaseQuery(user).get();

  if (snapshot.empty) {
    setterForPaginationFlag(true);
    return;
  }

  appendQuestions(snapshot, setterForQuestions);
}

async function loadNextQuestions(
  currentQuestions: Question[],
  user: User,
  setterForQuestions: React.Dispatch<SetStateAction<Question[]>>,
  setterForPaginationFlag: React.Dispatch<SetStateAction<boolean>>
) {
  if (currentQuestions.length === 0) {
    return;
  }

  const lastQuestion = currentQuestions[currentQuestions.length - 1];
  const snapshot = await createBaseQuery(user)
    .startAfter(lastQuestion.createdAt)
    .get();

  if (snapshot.empty) {
    setterForPaginationFlag(true);
    return;
  }

  appendQuestions(snapshot, setterForQuestions);
}
