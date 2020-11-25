import React from 'react';
import dayjs from 'dayjs';
import { Question } from 'models/Question';

interface Props {
  question: Question;
}

const Card: React.FC<Props> = ({ question }) => {
  return (
    <div className="transition duration-100 ease-in-out transform p-1 w-full">
      <div className="p-6 space-x-4 bg-white rounded-lg shadow-lg h-screen">
        <div>
          <p className="text-gray-500">{question.body}</p>
          <small>
            {dayjs(question.createdAt.toDate()).format('YYYY/MM/DD HH:mm')}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Card;
