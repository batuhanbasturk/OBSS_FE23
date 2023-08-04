import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import notAuthorized from "../images/notAuthorized.svg";
import {
  containerStyle,
  imageStyle,
  titleStyle,
} from "../constants/errorPageStyles";

const NotAuthorizedPage = ({ error }) => {
  const navigate = useNavigate();
  return (
    <Container sx={containerStyle}>
      <img src={notAuthorized} alt="not-auth" sx={imageStyle} />
      <Typography variant="h5" component="h2" sx={titleStyle}>
        {error ? error : "Not Authorized"}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          error ? navigate("/welcome") : navigate("/");
        }}
      >
        {error ? "Go to Welcome Page" : "Go to Home Page"}
      </Button>
    </Container>
  );
};

export default NotAuthorizedPage;
