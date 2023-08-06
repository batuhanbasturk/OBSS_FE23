import { ReactComponent as Circle } from "../svgs/speedometer-circle.svg";
import { ReactComponent as Arrow } from "../svgs/speedometer-arrow.svg";
import "../styles/Speedometer.css";

const Speedometer = ({ speed }) => {
  const arrowRotation = -150 + (speed * 300) / 100; // Calculate rotation angle for arrow

  return (
    <div>
      <div className="speed-container">
        <Circle className="speed-circle" />
        <div
          className="speed-arrow"
          style={{ "--arrow-rotation": `${arrowRotation}deg` }}
        >
          <Arrow />
        </div>
        <div className="speed-text">
          {speed}
          <br />
          KM/H
        </div>
      </div>
    </div>
  );
};

export default Speedometer;
