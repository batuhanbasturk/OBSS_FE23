import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import "./App.css";

import Plane from "./components/Plane";
import Speedometer from "./components/Speedometer";
import Battery from "./components/Battery";

const App = () => {
  const [planeAngle, setPlaneAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(100);
  const [socket, setSocket] = useState(null);
  const [blink, setBlink] = useState(false);

  // Create the WebSocket connection when the component mounts
  useEffect(() => {
    const newSocket = new W3CWebSocket("ws://localhost:5175");

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.eventName === "PLANE_SPEED") {
        setSpeed(parseFloat(data.data.speed));
      } else if (data.eventName === "PLANE_ANGLE") {
        setPlaneAngle(parseFloat(data.data.angle));
      } else if (data.eventName === "PLANE_BATTERY") {
        const batteryValue = parseInt(data.data.battery);
        setBattery(batteryValue);
        batteryValue < 20 && setBlink(true);
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
      console.log("WebSocket connection established");
      socket.send("START");
    }
  };

  const handleStopButtonClick = () => {
    if (socket && socket.readyState === socket.OPEN) {
      console.log("WebSocket connection established");
      socket.send("STOP");
    }
  };

  return (
    <div className="container">
      <div>
        <Plane angle={planeAngle} />
      </div>
      <div>
        <Speedometer speed={speed} />
      </div>
      <div>
        <Battery battery={battery} blink={blink} />
      </div>

      <div className="button-container">
        <button onClick={handleStartButtonClick}>Start</button>
        <button onClick={handleStopButtonClick}>Stop</button>
      </div>
    </div>
  );
};

export default App;
