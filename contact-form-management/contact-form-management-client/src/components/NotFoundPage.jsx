//navigation
import { useNavigate } from "react-router-dom";
//context
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//UI
import styles from "../styles/errorPages.module.css";
import { Button, Box, Typography } from "@mui/material";
import NotFound from "../images/404.svg";

const NotFoundPage = ({ error }) => {
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  return (
    <Box className={styles.container}>
      {/* error stands for message not found, user not found specific pages */}
      <img src={NotFound} alt="404" className={styles.image} />
      <Typography variant="h5" component="h2" className={styles.title}>
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
    </Box>
  );
};

export default NotFoundPage;
