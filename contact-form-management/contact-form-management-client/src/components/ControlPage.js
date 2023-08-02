import { useNavigate } from "react-router-dom";
import { logout } from "../services/logout";
import { useUserContext } from "../context/UserContext";

import Profile from "./Profile";

const ControlPage = () => {
  const { userData } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const logoutMessage = await logout(token);
      window.alert(logoutMessage);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Profile userData={userData} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ControlPage;
