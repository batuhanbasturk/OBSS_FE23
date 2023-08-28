//context
import { useUserContext } from "../context/UserContext";
import { useLanguageContext } from "../context/LanguageContext";
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
  const { labels } = useLanguageContext();
  const { images } = useImageContext();
  return (
    <>
      <Navbar />
      <Container className={styles.container}>
        <img src={`${strapi}${images["greetings"]?.url}`} alt="Greetings" />
        <Typography variant="h4" component="h1" gutterBottom>
          {labels.welcome} {userData.username}
        </Typography>
      </Container>
    </>
  );
};

export default WelcomePage;
