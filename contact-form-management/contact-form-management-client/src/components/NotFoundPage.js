// components/NotFoundPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate("/")}>Go to Homepage</button>
    </div>
  );
};

export default NotFoundPage;
