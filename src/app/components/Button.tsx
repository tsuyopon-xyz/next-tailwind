import React from 'react';

type Props = {
  title: string;
  onClick?: () => void;
} & JSX.IntrinsicElements['button'];

const Card: React.FC<Props> = ({
  title,
  type = 'button',
  disabled,
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className={`border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-100 ease select-none enab focus:outline-none focus:shadow-outline active:bg-indigo-900 disabled:opacity-70 ${
        disabled ? 'cursor-not-allowed' : 'hover:bg-indigo-600'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Card;
