//context
import { useUserContext } from "../context/UserContext";
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//navigation
import Navbar from "./Navbar";
//UI
import styles from "../styles/Welcome.module.css";
import { Container, Typography } from "@mui/material";
//strapi
import { strapi } from "../server/server";
//images
import { useImageContext } from "../context/ImageContext";

const WelcomePage = () => {
  const { userData } = useUserContext();
  const { language } = useLanguageContext();
  const { images } = useImageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;
  return (
    <>
      <Navbar />
      <Container className={styles.container}>
        <img src={`${strapi}${images["greetings"]?.url}`} alt="Greetings" />
        <Typography variant="h4" component="h1" gutterBottom>
          {translations.WelcomePage.welcome} {userData.username}
        </Typography>
      </Container>
    </>
  );
};

export default WelcomePage;
