//navigation
import { useNavigate } from "react-router-dom";
//context
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//UI
import { Button, Container, Typography } from "@mui/material";
import NotFound from "../images/404.svg";
import {
  containerStyle,
  imageStyle,
  titleStyle,
} from "../constants/errorPageStyles";

const NotFoundPage = ({ error }) => {
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  return (
    <Container sx={containerStyle}>
      {/* error stands for message not found, user not found specific pages */}
      <img src={NotFound} alt="404" sx={imageStyle} />
      <Typography variant="h5" component="h2" sx={titleStyle}>
        {error ? error : translations.NotFoundPage.notFound}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          error ? navigate("/welcome") : navigate("/");
        }}
      >
        {translations.NotFoundPage.navigateTitle}
      </Button>
    </Container>
  );
};

export default NotFoundPage;
