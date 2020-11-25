import React from 'react';
import dayjs from 'dayjs';
import { Answer } from 'models/Answer';

interface Props {
  answer: Answer;
}

const Card: React.FC<Props> = ({ answer }) => {
  return (
    <div className="transition duration-100 ease-in-out transform p-1 w-full">
      <div className="p-6 space-x-4 bg-white rounded-lg shadow-lg">
        <div>
          <p className="text-gray-500">{answer.body}</p>
          <small>
            {dayjs(answer.createdAt.toDate()).format('YYYY/MM/DD HH:mm')}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Card;
