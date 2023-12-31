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
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//UI
import styles from "../styles/MessageDetails.module.css";
import Details from "../images/details.svg";
import { Card, CardContent, Typography, Box } from "@mui/material";

const MessageDetailsPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState({});
  const [notFoundError, setNotFoundError] = useState("");

  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

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
        <img src={Details} alt="details" className={styles.detailsImage} />
        <Card variant="outlined" className={styles.card}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {translations.messagesPage.id}: {message.id}
            </Typography>
            <Typography color="textSecondary">
              {translations.messagesPage.name}: {message.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {translations.messagesPage.message} : {message.message}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {translations.messagesPage.gender}: {message.gender}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {translations.messagesPage.country}: {message.country}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {translations.messagesPage.read}:{" "}
              {message.read === "true"
                ? translations.messagesPage.readed
                : translations.messagesPage.notReaded}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {translations.messagesPage.date}:{" "}
              {formatDateAndTime(message.creationDate)}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default MessageDetailsPage;
