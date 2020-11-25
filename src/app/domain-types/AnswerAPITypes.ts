import { Answer } from 'models/Answer';
import { Question } from 'models/Question';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type AnswerFormatForAPI = Override<
  Answer,
  {
    createdAt: {
      _seconds: number;
      _nanoseconds: number;
    };
  }
>;

export type QuestionFormatForAPI = Override<
  Question,
  {
    createdAt: {
      _seconds: number;
      _nanoseconds: number;
    };
  }
>;

export interface AnswerAPIResponse {
  answer: AnswerFormatForAPI;
  question: QuestionFormatForAPI;
}
