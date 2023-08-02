import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ControlPage from "./components/ControlPage";
import NotFoundPage from "./components/NotFoundPage";
import NotAuthorizedPage from "./components/NotAuthorizedPage";
import { useState, useEffect } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {!isAuthenticated && (
          <Route path="/notauthorized" element={<NotAuthorizedPage />} />
        )}
        {isAuthenticated && <Route path="/control" element={<ControlPage />} />}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
