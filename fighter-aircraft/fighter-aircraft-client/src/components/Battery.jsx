import React from "react";
import { ReactComponent as BatterySvg } from "../svgs/battery.svg";

const Battery = ({ battery, blink }) => {
  return (
    <div>
      <div>{battery}%</div>
      <BatterySvg />
    </div>
  );
};

export default Battery;
