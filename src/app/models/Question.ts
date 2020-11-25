import firebase from 'firebase/app';

export interface QuestionRequest {
  senderUid: string;
  receiverUid: string;
  body: string;
  isReplied: boolean;
  createdAt: firebase.firestore.FieldValue;
}

export interface Question extends QuestionRequest {
  id: string;
  createdAt: firebase.firestore.Timestamp;
}
