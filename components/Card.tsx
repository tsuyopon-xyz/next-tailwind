import React from 'react';

const Card: React.FC = ({}) => {
  return (
    <div className="transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:z-10 p-1 w-full tablet:w-6/12 laptop:w-4/12 desktop:w-3/12">
      <div className="p-6 m-0 bg-white rounded-lg flex flex-grow tablet:flex-grow-0 desktop:flex-grow-0 shadow-lg space-x-4">
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
