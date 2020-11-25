import firebase from 'firebase/app';

export interface AnswerRequest {
  uid: string;
  questionId: string;
  body: string;
  createdAt: firebase.firestore.Timestamp;
}

export interface Answer extends AnswerRequest {
  id: string;
  createdAt: firebase.firestore.Timestamp;
}
