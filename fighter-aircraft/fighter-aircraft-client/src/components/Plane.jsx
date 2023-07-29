import React from "react";
import { ReactComponent as PlaneSvg } from "../svgs/294109.svg";
const Plane = ({ angle }) => {
  return (
    <div>
      <div>Plane Angle: {angle}</div>
      <PlaneSvg style={{ transform: `rotate(${angle}deg)` }} />
    </div>
  );
};

export default Plane;
