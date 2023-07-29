import React from "react";
import { ReactComponent as Circle } from "../svgs/speedometer-circle.svg";
import { ReactComponent as Arrow } from "../svgs/speedometer-arrow.svg";

const Speedometer = ({ speed }) => {
  const arrowRotation = -120 + (speed * 240) / 100; // Calculate rotation angle for arrow

  const containerStyle = {
    position: "relative",
    width: "200px",
    height: "200px",
  };

  const circleStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  };

  const arrowStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) rotate(${arrowRotation}deg)`,
  };

  return (
    <div>
      <div>{speed} KM/H</div>
      <div style={containerStyle}>
        <Circle style={circleStyle} />
        <Arrow style={arrowStyle} />
      </div>
    </div>
  );
};

export default Speedometer;
