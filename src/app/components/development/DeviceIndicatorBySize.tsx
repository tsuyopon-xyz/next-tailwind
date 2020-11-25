import React from 'react';

const DeviceIndicatorBySize: React.FC = () => {
  return (
    <div className="fixed left-0 bottom-0 m-8 p-3 text-xs text-white h-20 w-20 rounded-full flex items-center justify-center bg-gray-700 tablet:bg-pink-500 laptop:bg-yellow-500 desktop:bg-green-500 z-10">
      <div className="block  tablet:hidden laptop:hidden desktop:hidden">
        smartphone
      </div>
      <div className="hidden tablet:block  laptop:hidden desktop:hidden">
        tablet
      </div>
      <div className="hidden tablet:hidden laptop:block  desktop:hidden">
        laptop
      </div>
      <div className="hidden tablet:hidden laptop:hidden desktop:block">
        desktop
      </div>
    </div>
  );
};

export default DeviceIndicatorBySize;
