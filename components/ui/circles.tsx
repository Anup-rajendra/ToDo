// components/YellowCircle.tsx
import React from "react";

interface YellowCircleProps {
  size?: string;
}
interface GreyCircleProps {
  size?: string;
}
const YellowCircle: React.FC<YellowCircleProps> = ({ size = "h-6 w-6" }) => {
  return (
    <div
      className={`rounded-full bg-yellow-500 ${size} flex items-center justify-center`}
    >
      {/* You can add content inside the circle if needed */}
    </div>
  );
};
const GreyCircle: React.FC<GreyCircleProps> = ({ size = "h-6 w-6" }) => {
  return (
    <div
      className={`rounded-full bg-yellow-950 ${size} flex items-center justify-center`}
    >
      {/* You can add content inside the circle if needed */}
    </div>
  );
};

export { YellowCircle, GreyCircle };
