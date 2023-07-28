import React from "react";

const Speedometer = ({ speed }) => {
  return (
    <div>
      <div>{speed.toFixed(2)} mph</div>
    </div>
  );
};

export default Speedometer;
