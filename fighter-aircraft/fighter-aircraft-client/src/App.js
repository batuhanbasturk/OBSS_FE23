import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import "./styles/App.css";

import Plane from "./components/Plane";
import Speedometer from "./components/Speedometer";
import Battery from "./components/Battery";

const App = () => {
  const [planeAngle, setPlaneAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(100);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new W3CWebSocket("ws://localhost:5175");

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.eventName === "PLANE_SPEED") {
        setSpeed(data.data.speed);
      } else if (data.eventName === "PLANE_ANGLE") {
        setPlaneAngle(data.data.angle);
      } else if (data.eventName === "PLANE_BATTERY") {
        const batteryValue = data.data.battery;
        setBattery(batteryValue);
      }
    };

    newSocket.onclose = () => {
      console.log("Disconnected from the WebSocket server");
    };
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleStartButtonClick = () => {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send("START");
    }
  };

  const handleStopButtonClick = () => {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send("STOP");
    }
  };

  return (
    <>
      <div className="container">
        <div className="plane-container">
          <Plane angle={planeAngle} />
        </div>
        <div className="speedometer-container">
          <Speedometer speed={speed} />
        </div>
        <div className="battery-position-container">
          <Battery battery={battery} />
        </div>
        <div className="button-container">
          <button className="start-button" onClick={handleStartButtonClick}>
            Start
          </button>
          <button className="stop-button" onClick={handleStopButtonClick}>
            Stop
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
