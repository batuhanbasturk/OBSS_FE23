import { useEffect } from "react";
//api
import { checkLogin } from "../api/login/checklogin";
//navigation
import { useNavigate } from "react-router-dom";
//context
import { useUserContext } from "../context/UserContext";

const AuthorizationManager = () => {
  const navigate = useNavigate();

  const { setUserData, setChecked, setTokenError } = useUserContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const checker = async () => {
      try {
        const fullData = await checkLogin(token);
        setUserData(fullData);
        setChecked(true);
      } catch (error) {
        setChecked(true);
        // navigate to login page with error message
        setTokenError(error);
        localStorage.removeItem("token");
        navigate(`/login`);
      }
    };
    if (token) {
      checker();
    } else {
      setChecked(true);
    }
  }, [navigate, setUserData, setChecked, setTokenError]);
};

export default AuthorizationManager;
