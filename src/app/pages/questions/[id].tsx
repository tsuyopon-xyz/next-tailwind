import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { Answer } from 'models/Answer';
import { Question } from 'models/Question';
import AnswerCard from 'components/AnswerCard';
import QuestionCard from 'components/QuestionCard';
import AnswerForm from 'components/AnswerForm';
import { useAuthentication } from 'hooks/authentication';

type Query = {
  id: string;
};

export default function QuestionsShow() {
  const router = useRouter();
  const query = router.query as Query;
  const { user } = useAuthentication();
  const [question, setQuestion] = useState<Question>(null);
  const [answer, setAnswer] = useState<Answer>(null);
  const [isLoadedAnswer, setIsLoadedAnswer] = useState(false);

  async function loadQuestion() {
    if (query.id === undefined) {
      return;
    }

    const questionDoc = await firebase
      .firestore()
      .collection('questions')
      .doc(query.id)
      .get();
    if (!questionDoc.exists) {
      return;
    }

    const gotQuestion = questionDoc.data() as Question;
    gotQuestion.id = questionDoc.id;
    setQuestion(gotQuestion);
  }

  async function loadAnswer() {
    if (!question.isReplied) {
      setIsLoadedAnswer(true);
      return;
    }

    const answerSnapshot = await firebase
      .firestore()
      .collection('answers')
      .where('questionId', '==', question.id)
      .limit(1)
      .get();

    if (answerSnapshot.empty) {
      setIsLoadedAnswer(true);
      return;
    }

    const gotAnswer = answerSnapshot.docs[0].data() as Answer;
    gotAnswer.id = answerSnapshot.docs[0].id;
    setAnswer(gotAnswer);
    setIsLoadedAnswer(true);
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!question) {
      loadQuestion();
    }
    if (question && !isLoadedAnswer) {
      loadAnswer();
    }
  }, [user, query.id, question, answer, isLoadedAnswer]);

  return (
    <main className="px-10 pt-10 max-w-screen-desktop mx-auto">
      {question && user && isLoadedAnswer ? (
        <>
          <h2>質問内容</h2>
          <QuestionCard question={question} />
          {answer ? (
            <>
              <h2>回答内容</h2>
              <Link href={`/answers/${answer.id}`}>
                <a>
                  <AnswerCard answer={answer} />
                </a>
              </Link>
            </>
          ) : (
            <AnswerForm
              question={question}
              user={user}
              onSubmitted={setAnswer}
            />
          )}
        </>
      ) : (
        '読込中'
      )}
    </main>
  );
}
