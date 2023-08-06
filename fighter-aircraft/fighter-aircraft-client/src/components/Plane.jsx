import React from "react";
import { ReactComponent as PlaneSvg } from "../svgs/plane.svg";
const Plane = ({ angle }) => {
  const initialRotation = angle - 45;
  return (
    <div>
      <div>Plane Angle: {angle}</div>
      <PlaneSvg style={{ transform: `rotate(${initialRotation}deg)` }} />
    </div>
  );
};

export default Plane;
