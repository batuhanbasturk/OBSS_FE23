import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/logout";
import { checkLogin } from "../services/checklogin";

import Profile from "./Profile";

const ControlPage = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const logoutMessage = await logout(token);
      window.alert(logoutMessage);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      // bu error'un ne zaman tetiklendiğini sor
      console.error(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const checker = async () => {
      try {
        const userData = await checkLogin(token);
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        navigate(`/login?error=${encodeURIComponent(error)}`);
      }
    };
    checker();
  }, []);
  return (
    <div>
      <Profile userData={userData} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ControlPage;
