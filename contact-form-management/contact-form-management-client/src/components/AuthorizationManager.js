import { checkLogin } from "../api/checklogin";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

const AuthorizationManager = ({ children }) => {
  const navigate = useNavigate();

  const { setUserData } = useUserContext();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const checker = async () => {
      try {
        const fullData = await checkLogin(token);
        setUserData(fullData);
        setChecked(true);
      } catch (error) {
        navigate(`/login?error=${encodeURIComponent(error)}`);
      }
    };
    if (token) {
      checker();
    }
  }, [navigate, setUserData]);
  return checked && <>{children}</>;
};

export default AuthorizationManager;
