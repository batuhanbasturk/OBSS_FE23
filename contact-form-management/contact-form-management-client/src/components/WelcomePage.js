import { useUserContext } from "../context/UserContext";
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";

import Navbar from "./Navbar";

import greetings from "../images/greetings.svg";
import { Container, Typography } from "@mui/material";

const WelcomePage = () => {
  const { userData } = useUserContext();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;
  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <img src={greetings} alt="Greetings" />
        <Typography variant="h4" component="h1" gutterBottom>
          {translations.WelcomePage.welcome} {userData.username}
        </Typography>
      </Container>
    </>
  );
};

export default WelcomePage;
