import { useState, useEffect } from "react";
//navigation
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
//error
import NotFoundPage from "./NotFoundPage";
//utils
import { formatDateAndTime } from "../utils/formatDateAndTimeUtils";
//api
import { fetchMessages } from "../api/message/fetchMessages";
import { deleteMessage } from "../api/message/deleteMessage";
import { readMessage } from "../api/message/readMessage";
//context
import { useUserContext } from "../context/UserContext";
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//UI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReadIcon from "@mui/icons-material/Visibility";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { userData } = useUserContext();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  const handleViewMessageDetails = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await readMessage(id, token);
      navigate(`/message/${id}`);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteMessage(id, token);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== id)
      );
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getMessages = async () => {
      try {
        const messagesData = await fetchMessages(token);
        setMessages(messagesData);
      } catch (error) {
        setErrorMessage(error);
      }
    };

    getMessages();
  }, []);

  if (errorMessage) {
    return <NotFoundPage error={errorMessage} />;
  }
  return (
    <>
      <Navbar />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* View */}
              <TableCell>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  textAlign={language === "en" ? "center" : "left"}
                >
                  {translations.messagesPage.view}
                </Typography>
              </TableCell>
              {/* Id */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.messagesPage.id}
                </Typography>
              </TableCell>
              {/* Name */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.messagesPage.name}
                </Typography>
              </TableCell>
              {/* Message */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.messagesPage.message}
                </Typography>
              </TableCell>
              {/* Gender */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.messagesPage.gender}
                </Typography>
              </TableCell>
              {/* Country */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.messagesPage.country}
                </Typography>
              </TableCell>
              {/* Read status*/}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.messagesPage.read}
                </Typography>
              </TableCell>
              {/* Date */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.messagesPage.date}
                </Typography>
              </TableCell>
              {/* Delete for only admin*/}
              {userData.role === "admin" && (
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {translations.messagesPage.delete}
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* message data */}
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell onClick={() => handleViewMessageDetails(message.id)}>
                  <Button>
                    <ReadIcon />
                  </Button>
                </TableCell>
                <TableCell>{message.id}</TableCell>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.message}</TableCell>
                <TableCell>{message.gender}</TableCell>
                <TableCell>{message.country}</TableCell>
                <TableCell>{message.read}</TableCell>
                <TableCell style={{ whiteSpace: "pre-line" }}>
                  {formatDateAndTime(message.creationDate)}
                </TableCell>
                {userData.role === "admin" && (
                  <TableCell>
                    <Button onClick={() => handleDeleteMessage(message.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MessagesPage;
