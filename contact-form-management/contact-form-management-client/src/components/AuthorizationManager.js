import { checkLogin } from "../services/checklogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
const AuthorizationManager = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserContext();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const checker = async () => {
      try {
        const fullData = await checkLogin(token);
        setUserData(fullData);
      } catch (error) {
        navigate(`/login?error=${encodeURIComponent(error)}`);
      }
    };
    if (token) {
      checker();
    }
  }, [navigate, setUserData]);
};

export default AuthorizationManager;
