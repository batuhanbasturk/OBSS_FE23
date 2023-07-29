import React from "react";

const Speedometer = ({ speed }) => {
  const arrowRotation = -120 + (speed * 240) / 100; // Calculate rotation angle for arrow

  return (
    <div>
      <div>{speed} mph</div>
    </div>
  );
};

export default Speedometer;
