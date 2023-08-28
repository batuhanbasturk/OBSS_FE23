import React, { createContext, useState, useEffect, useContext } from "react";
import { getLabels } from "../api/label/getLabels";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [trLabels, setTrLabels] = useState({});
  const [enLabels, setEnLabels] = useState({});

  useEffect(() => {
    getLabels("tr")
      .then((fetchedTrLabels) => {
        setTrLabels(fetchedTrLabels);
      })
      .catch((error) => {
        console.log("Error fetching Turkish labels:", error);
      });

    getLabels("en")
      .then((fetchedEnLabels) => {
        setEnLabels(fetchedEnLabels);
      })
      .catch((error) => {
        console.log("Error fetching English labels:", error);
      });
  }, []);

  const labels = language === "tr" ? trLabels : enLabels;

  return (
    <LanguageContext.Provider
      value={{ labels: labels, trLabels, enLabels, language, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  return useContext(LanguageContext);
};
