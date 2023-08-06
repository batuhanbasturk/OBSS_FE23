import { useState, useEffect } from "react";
import { ReactComponent as BatterySVG } from "../svgs/battery.svg";
import "../styles/Battery.css";

const Battery = ({ battery }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const filledRectangles = Math.floor(battery / 25);
  const lastRectangleFill = battery % 25;

  let color;
  if (battery > 50) {
    color = "#4caf50";
  } else if (battery > 25) {
    color = "#fff279";
  } else {
    color = "#f44336";
  }

  const rectangleStyle = {
    width: "100%",
    height: "25%",
    backgroundColor: color,
    position: "absolute",
  };

  useEffect(() => {
    setIsBlinking(battery < 20);
  }, [battery]);

  return (
    <>
      <div className="battery-container">
        <div className={isBlinking ? "blink battery-text" : "battery-text"}>
          {battery}%
        </div>
        {Array.from({ length: filledRectangles }, (_, index) => (
          <div
            key={index}
            style={{
              ...rectangleStyle,
              bottom: `${index * 50}px`,
              animation: isBlinking ? "blink-animation 1s infinite" : "none",
            }}
          />
        ))}
        {lastRectangleFill > 0 && (
          <div
            style={{
              ...rectangleStyle,
              bottom: `${filledRectangles * 50}px`,
              height: `${lastRectangleFill}%`,
              animation: isBlinking ? "blink-animation 1s infinite" : "none",
            }}
          />
        )}
      </div>
      <BatterySVG className={isBlinking ? "blink" : ""} />
    </>
  );
};

export default Battery;
