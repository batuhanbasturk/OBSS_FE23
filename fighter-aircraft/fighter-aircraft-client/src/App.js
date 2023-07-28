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
  //const [batteryBlink, setBatteryBlink] = useState(false);

  useEffect(() => {
    const socket = new W3CWebSocket("ws://localhost:5175");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("Received data from WebSocket:", event.data);
      const data = JSON.parse(event.data);
      console.log("Parsed data object:", data);
      if (data.eventName === "PLANE_ANGLE") {
        setPlaneAngle(parseFloat(data.data.angle));
      } else if (data.eventName === "PLANE_SPEED") {
        setSpeed(parseFloat(data.data.speed));
      } else if (data.eventName === "PLANE_BATTERY") {
        const batteryValue = parseInt(data.data.battery);
        setBattery(batteryValue);
        //setBatteryBlink(batteryValue < 20);
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from the WebSocket server");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleStartButtonClick = () => {
    const socket = new WebSocket("ws://localhost:5175");
    socket.onopen = () => {
      console.log("WebSocket connection established");
      socket.send("START");
    };
  };

  const handleStopButtonClick = () => {
    const socket = new WebSocket("ws://localhost:5175");
    socket.onopen = () => {
      console.log("WebSocket connection established");
      socket.send("STOP");
    };
  };

  return (
    <div className="container">
      <Plane angle={planeAngle} />
      <Speedometer speed={speed} />
      <Battery battery={battery} />
      <div className="button-container">
        <button onClick={handleStartButtonClick}>Start</button>
        <button onClick={handleStopButtonClick}>Stop</button>
      </div>
    </div>
  );
};

export default App;
