import React from 'react';

const Card: React.FC = ({}) => {
  return (
    <div className="transition duration-100 ease-in-out transform hover:scale-110 hover:z-10 p-1 w-full">
      <div className="p-6 flex space-x-4 bg-white rounded-lg shadow-lg">
        <div className="flex-shrink-0">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div>
          <div className="text-xl font-medium text-black">Name area</div>
          <p className="text-gray-500">Name area</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
