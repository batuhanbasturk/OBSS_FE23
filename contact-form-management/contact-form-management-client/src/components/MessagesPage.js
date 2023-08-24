import { useState, useEffect } from "react";
//navigation
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
//error
import NotFoundPage from "./NotFoundPage";
//utils
import { formatDateAndTime } from "../utils/formatDateAndTimeUtils";
//api
import { deleteMessage } from "../api/message/deleteMessage";
import { readMessage } from "../api/message/readMessage";
import { fetchMessagesWithPagination } from "../api/message/messagesWithPagination";
//context
import { useUserContext } from "../context/UserContext";
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//snackbar
import { useSnackbar } from "../utils/snackbarUtils";
//socket
import { w3cwebsocket as W3CWebSocket } from "websocket";
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
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReadIcon from "@mui/icons-material/Visibility";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [pagination, setPagination] = useState({ page: 1, pageSize: 5 });
  const [sorting, setSorting] = useState({ sortBy: "id", sortOrder: "asc" });

  const navigate = useNavigate();
  const { handleSnackbarOpen, SnackbarComponent } = useSnackbar();
  //context
  const { userData, setTokenError } = useUserContext();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  const nextPage = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: prevPagination.page + 1,
    }));
  };

  const previousPage = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: prevPagination.page - 1,
    }));
  };

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
      handleSnackbarOpen(
        translations.messagesPage.deletedSnackbarMessage,
        "info"
      );
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getMessages = async () => {
      try {
        const response = await fetchMessagesWithPagination(
          pagination.page,
          pagination.pageSize,
          sorting.sortBy,
          sorting.sortOrder,
          token
        );
        setMessages(response);
      } catch (error) {
        setTokenError(error);
        navigate("/login");
      }
    };

    getMessages();
  }, [pagination, sorting, navigate, setTokenError]);

  useEffect(() => {
    const socket = new W3CWebSocket("ws://localhost:5165");

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "dataUpdate") {
        handleSnackbarOpen(
          translations.newMessage +
            data.message.name +
            ": " +
            data.message.message,
          "info"
        );
      }
    });
    return () => {
      socket.close();
    };
  }, [handleSnackbarOpen, translations.newMessage]);

  if (errorMessage) {
    return <NotFoundPage error={errorMessage} />;
  }
  return (
    <>
      <Navbar />
      <Select
        value={sorting.sortBy}
        onChange={(e) => {
          setSorting((prevSorting) => ({
            ...prevSorting,
            sortBy: e.target.value,
          }));
        }}
      >
        <MenuItem value="id">{translations.messagesPage.id}</MenuItem>
        <MenuItem value="name">{translations.messagesPage.name}</MenuItem>
        <MenuItem value="gender">{translations.messagesPage.gender}</MenuItem>
        <MenuItem value="creationDate">
          {translations.messagesPage.date}
        </MenuItem>
        <MenuItem value="country">{translations.messagesPage.country}</MenuItem>
      </Select>
      <Select
        value={sorting.sortOrder}
        onChange={(e) => {
          setSorting((prevSorting) => ({
            ...prevSorting,
            sortOrder: e.target.value,
          }));
        }}
      >
        <MenuItem value="asc">{translations.messagesPage.asc}</MenuItem>
        <MenuItem value="desc">{translations.messagesPage.desc}</MenuItem>
      </Select>
      <Select
        value={pagination.pageSize}
        onChange={(e) => {
          setPagination((prevPagination) => ({
            ...prevPagination,
            pageSize: e.target.value,
          }));
        }}
        onClick={() => {
          setPagination((prevPagination) => ({
            ...prevPagination,
            page: 1,
          }));
        }}
      >
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="20">20</MenuItem>
        <MenuItem value="100">100</MenuItem>
      </Select>
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
                <TableCell>
                  {message.message.length > 30
                    ? `${message.message.substring(0, 30)}...`
                    : message.message}
                </TableCell>
                <TableCell>{message.gender}</TableCell>
                <TableCell>{message.country}</TableCell>
                {message.read === "true" ? (
                  <TableCell>{translations.messagesPage.readed}</TableCell>
                ) : (
                  <TableCell>{translations.messagesPage.notReaded}</TableCell>
                )}
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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Button
          onClick={previousPage}
          disabled={pagination.page === 1}
          color="primary"
          variant="contained"
          style={{ marginRight: "10px" }}
        >
          {translations.messagesPage.previousPage}
        </Button>
        <Button
          onClick={nextPage}
          disabled={messages.length < pagination.pageSize}
          color="primary"
          variant="contained"
        >
          {translations.messagesPage.nextPage}
        </Button>
      </div>
      <SnackbarComponent />
    </>
  );
};

export default MessagesPage;
