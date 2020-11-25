import { NextApiRequest, NextApiResponse } from 'next';
import 'libs/firebase_admin';
import { firestore } from 'firebase-admin';
import {
  AnswerAPIResponse,
  AnswerFormatForAPI,
  QuestionFormatForAPI,
} from 'domain-types/AnswerAPITypes';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<AnswerAPIResponse>
) => {
  const id = req.query.id as string;

  const answerDoc = await firestore().collection('answers').doc(id).get();
  const answer = answerDoc.data() as AnswerFormatForAPI;
  answer.id = answerDoc.id;

  const questionDoc = await firestore()
    .collection('questions')
    .doc(answer.questionId)
    .get();
  const question = questionDoc.data() as QuestionFormatForAPI;
  question.id = questionDoc.id;

  res.status(200).json({
    answer,
    question,
  });
};
