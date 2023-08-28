//navigation
import { useNavigate } from "react-router-dom";
//context
import { useLanguageContext } from "../context/LanguageContext";
//UI
import styles from "../styles/errorPages.module.css";
import { Button, Box, Typography } from "@mui/material";
//strapi
import { strapi } from "../server/server";
//images
import { useImageContext } from "../context/ImageContext";

const NotFoundPage = ({ error }) => {
  const navigate = useNavigate();
  const { images } = useImageContext();
  const { labels } = useLanguageContext();

  return (
    <Box className={styles.container}>
      {/* error stands for message not found, user not found specific pages */}
      <img
        src={`${strapi}${images["404"]?.url}`}
        alt="404"
        className={styles.image}
      />
      <Typography variant="h5" component="h2" className={styles.title}>
        {error ? error : labels.notFound}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          error ? navigate("/welcome") : navigate("/");
        }}
      >
        {labels.navigateTitle}
      </Button>
    </Box>
  );
};

export default NotFoundPage;
