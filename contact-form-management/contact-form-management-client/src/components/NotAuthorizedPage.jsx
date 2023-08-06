import { useNavigate } from "react-router-dom";
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
import { Button, Container, Typography } from "@mui/material";
import notAuthorized from "../images/notAuthorized.svg";
import {
  containerStyle,
  imageStyle,
  titleStyle,
} from "../constants/errorPageStyles";

const NotAuthorizedPage = ({ error }) => {
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  return (
    <Container sx={containerStyle}>
      <img src={notAuthorized} alt="not-auth" sx={imageStyle} />
      <Typography variant="h5" component="h2" sx={titleStyle}>
        {error ? error : translations.NotAuthorizedPage.notAuthorized}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          error ? navigate("/welcome") : navigate("/");
        }}
      >
        {translations.NotAuthorizedPage.navigateTitle}
      </Button>
    </Container>
  );
};

export default NotAuthorizedPage;
