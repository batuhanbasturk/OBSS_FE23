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
  const { labels } = useLanguageContext();

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
      handleSnackbarOpen(labels.deletedSnackbarMessage, "info");
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
          labels.newMessage + data.message.name + ": " + data.message.message,
          "info"
        );
      }
    });
    return () => {
      socket.close();
    };
  }, [handleSnackbarOpen, labels.newMessage]);

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
        <MenuItem value="id">{labels.idLabel}</MenuItem>
        <MenuItem value="name">{labels.nameLabel}</MenuItem>
        <MenuItem value="gender">{labels.genderLabel}</MenuItem>
        <MenuItem value="creationDate">{labels.dateLabel}</MenuItem>
        <MenuItem value="country">{labels.country}</MenuItem>
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
        <MenuItem value="asc">{labels.asc}</MenuItem>
        <MenuItem value="desc">{labels.desc}</MenuItem>
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
                  textAlign={labels.locale === "en" ? "center" : "left"}
                >
                  {labels.view}
                </Typography>
              </TableCell>
              {/* Id */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {labels.idLabel}
                </Typography>
              </TableCell>
              {/* Name */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {labels.nameLabel}
                </Typography>
              </TableCell>
              {/* Message */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {labels.messageLabel}
                </Typography>
              </TableCell>
              {/* Gender */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {labels.genderLabel}
                </Typography>
              </TableCell>
              {/* Country */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {labels.countryLabel}
                </Typography>
              </TableCell>
              {/* Read status*/}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {labels.read}
                </Typography>
              </TableCell>
              {/* Date */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {labels.date}
                </Typography>
              </TableCell>
              {/* Delete for only admin*/}
              {userData.role === "admin" && (
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {labels.delete}
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
                  <TableCell>{labels.readed}</TableCell>
                ) : (
                  <TableCell>{labels.notReaded}</TableCell>
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
          {labels.previousPage}
        </Button>
        <Button
          onClick={nextPage}
          disabled={messages.length < pagination.pageSize}
          color="primary"
          variant="contained"
        >
          {labels.nextPage}
        </Button>
      </div>
      <SnackbarComponent />
    </>
  );
};

export default MessagesPage;
