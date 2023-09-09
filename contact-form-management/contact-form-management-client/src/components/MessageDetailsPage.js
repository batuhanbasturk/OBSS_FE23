import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//api
import { getMessageById } from "../api/message/messageById";
//utils
import { formatDateAndTime } from "../utils/formatDateAndTimeUtils";
//error
import NotFoundPage from "./NotFoundPage";
//navigation
import Navbar from "./Navbar";
//context
import { useLanguageContext } from "../context/LanguageContext";
//UI
import styles from "../styles/MessageDetails.module.css";
import { Card, CardContent, Typography, Box } from "@mui/material";
//strapi
import { strapi } from "../server/server";
//images
import { useImageContext } from "../context/ImageContext";

const MessageDetailsPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState({});
  const [notFoundError, setNotFoundError] = useState("");

  const { images } = useImageContext();
  const { labels } = useLanguageContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchMessageById = async () => {
      try {
        //api call to get message by id
        const message = await getMessageById(id, token);
        setMessage(message);
      } catch (error) {
        setNotFoundError(error);
      }
    };

    fetchMessageById();
  }, [id]);

  if (notFoundError) {
    return <NotFoundPage error={notFoundError} />;
  }

  return (
    <>
      <Navbar />
      <Box className={styles.container}>
        <img
          src={`${strapi}${images["details"]?.url}`}
          alt="details"
          className={styles.detailsImage}
        />
        <Card variant="outlined" className={styles.card}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {labels.idLabel}: {message.id}
            </Typography>
            <Typography color="textSecondary">
              {labels.nameLabel}: {message.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {labels.messageLabel} : {message.message}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {labels.genderLabel}: {message.gender}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {labels.country}: {message.country}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {labels.read}:{" "}
              {message.read === "true" ? labels.readed : labels.notReaded}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {labels.date}: {formatDateAndTime(message.creationDate)}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default MessageDetailsPage;
