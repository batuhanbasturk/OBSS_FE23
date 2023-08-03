import { useNavigate } from "react-router-dom";

import { Button, Container, Typography } from "@mui/material";
import NotFound from "../images/404.svg";
import {
  containerStyle,
  imageStyle,
  titleStyle,
} from "../constants/errorPageStyles";

const NotFoundPage = ({ error }) => {
  const navigate = useNavigate();

  return (
    <Container sx={containerStyle}>
      <img src={NotFound} alt="404" sx={imageStyle} />
      <Typography variant="h5" component="h2" sx={titleStyle}>
        {error ? error : "Page Not Found"}
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
