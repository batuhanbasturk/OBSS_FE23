import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import NotFound from "../images/404.svg";

const NotFoundPage = ({ error }) => {
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  const imageStyle = {
    marginBottom: "16px",
    maxWidth: "100%",
    height: "auto",
  };

  const titleStyle = {
    marginBottom: "16px",
  };

  const textStyle = {
    marginBottom: "16px",
  };

  console.log(error);
  return (
    <Container sx={containerStyle}>
      <img src={NotFound} alt="404" sx={imageStyle} />
      <Typography variant="h5" component="h2" sx={titleStyle}>
        {error ? error : "Page Not Found"}
      </Typography>
      <Typography variant="body1" sx={textStyle}>
        {error
          ? "The message you are looking for does not exist"
          : "The page you are looking for does not exist."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          error ? navigate("/messages") : navigate("/");
        }}
      >
        {error ? "Go to Messages" : "Go to Homepage"}
      </Button>
    </Container>
  );
};

export default NotFoundPage;
