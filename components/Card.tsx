import React from 'react';

const Card: React.FC = ({ children }) => {
  return <div className="p-10 shadow-xl w-1/2 sm:w-10">{children}</div>;
};

export default Card;
