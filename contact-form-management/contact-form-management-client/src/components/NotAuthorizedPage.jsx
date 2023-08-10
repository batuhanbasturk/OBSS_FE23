//navigation
import { useNavigate } from "react-router-dom";
//context
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//UI
import styles from "../styles/errorPages.module.css";
import { Button, Box, Typography } from "@mui/material";
import notAuthorized from "../images/notAuthorized.svg";

const NotAuthorizedPage = ({ error }) => {
  const navigate = useNavigate();

  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  return (
    <Box className={styles.container}>
      {/* error => welcome default => home*/}
      <img src={notAuthorized} alt="not-auth" className={styles.image} />
      <Typography variant="h5" component="h2" className={styles.title}>
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
    </Box>
  );
};

export default NotAuthorizedPage;
