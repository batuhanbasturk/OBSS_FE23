import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [checked, setChecked] = useState(false);
  const [tokenError, setTokenError] = useState("");

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        checked,
        setChecked,
        tokenError,
        setTokenError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
