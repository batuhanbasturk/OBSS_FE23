import axios from "axios";
import { useState } from "react";

export const useAuthentication = () => {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e, setLoggedIn) => {
    e.preventDefault();
    const userData = {
      username: data.username,
      password: data.password,
    };
    axios
      .post("https://dummyjson.com/auth/login", userData)
      .then((res) => {
        setUserData(res.data);
        console.log(setUserData);
        setLoggedIn(true);
        setError("");
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError("Network error occurred. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      });
  };

  return {
    userData,
    data,
    handleChange,
    handleSubmit,
    setUserData,
    error,
  };
};
