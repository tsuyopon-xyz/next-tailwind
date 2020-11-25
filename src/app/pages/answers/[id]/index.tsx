import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import firebase from 'firebase/app';
import { Answer } from 'models/Answer';
import { Question } from 'models/Question';
import { AnswerAPIResponse } from 'domain-types/AnswerAPITypes';
import AnswerCard from 'components/AnswerCard';
import QuestionCard from 'components/QuestionCard';

const AnswersShow: React.FC<AnswerAPIResponse> = ({ answer, question }) => {
  const answerUsingFirestoreTimestamp: Answer = {
    ...answer,
    createdAt: new firebase.firestore.Timestamp(
      answer.createdAt._seconds,
      answer.createdAt._nanoseconds
    ),
  };
  const questionUsingFirestoreTimestamp: Question = {
    ...question,
    createdAt: new firebase.firestore.Timestamp(
      question.createdAt._seconds,
      question.createdAt._nanoseconds
    ),
  };
  const description = getDescription(answerUsingFirestoreTimestamp);

  return (
    <>
      <Head>
        <meta name="description" key="description" content={description} />
        <meta
          property="og:description"
          key="ogDescription"
          content={description}
        />
      </Head>
      <main className="px-10 pt-10 max-w-screen-desktop mx-auto">
        <h1>回答ページ</h1>
        <h2>質問内容</h2>
        <QuestionCard question={questionUsingFirestoreTimestamp} />

        <h2>回答内容</h2>
        <AnswerCard answer={answerUsingFirestoreTimestamp} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<AnswerAPIResponse> = async ({
  query,
}: GetServerSidePropsContext) => {
  const res = await fetch(process.env.API_URL + `/api/answers/${query.id}`);
  const json: AnswerAPIResponse = await res.json();

  return {
    props: {
      ...json,
    },
  };
};

export default AnswersShow;

function getDescription(answer: Answer) {
  const body = answer.body.trim().replace(/[ \r\n]/g, '');
  if (body.length < 140) {
    return body;
  }
  return body.substring(0, 140) + '...';
}
