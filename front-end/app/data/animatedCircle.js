import React from "react";

const AnimatedCircle = () => {
  return (
    <div className="relative w-4 h-4 bg-red-600 rounded-full mx-auto">
      <div className="absolute w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  );
};

export default AnimatedCircle;
