import React from 'react';

export interface Props {
  title: string;
  onClick?: () => void;
}

const Card: React.FC<Props> = ({ title, onClick = () => {} }) => {
  return (
    <button
      type="button"
      className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-100 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Card;
