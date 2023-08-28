import { useState, useEffect, useRef, useCallback } from "react";
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
import { fetchMessagesWithPaginationScroll } from "../api/message/messagesWithPaginationScroll";
//context
import { useUserContext } from "../context/UserContext";
import { useLanguageContext } from "../context/LanguageContext";
//snackbar
import { useSnackbar } from "../utils/snackbarUtils";
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
import { CircularProgress } from "@mui/material";

const MessagesScrollPage = () => {
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [pagination, setPagination] = useState({ page: 1, pageSize: 15 });
  const [loading, setLoading] = useState(true);
  const isInitialRender = useRef(true);

  const { handleSnackbarOpen, SnackbarComponent } = useSnackbar();

  const navigate = useNavigate();
  const { userData, setTokenError } = useUserContext();
  const { labels } = useLanguageContext();

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

  const nextPage = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: prevPagination.page + 1,
    }));
  };

  const loadMoreMessages = useCallback(async () => {
    if (!loading) return;

    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const message = await fetchMessagesWithPaginationScroll(
        token,
        pagination.page,
        pagination.pageSize
      );

      if (message.length === 0) {
        setLoading(false);
        return;
      }
      setMessages((prevMessages) => [...prevMessages, ...message]);
    } catch (error) {
      setTokenError(error);
      navigate("/login");
    }
  }, [pagination, loading, navigate, setTokenError]);

  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      if (scrollTop + windowHeight >= documentHeight) {
        nextPage();
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    loadMoreMessages();
  }, [loadMoreMessages]);

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
                <SnackbarComponent />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default MessagesScrollPage;
