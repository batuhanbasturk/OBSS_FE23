import React, { useState, useEffect } from "react";
import { fetchMessages } from "../api/fetchMessages";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { formatDateAndTime } from "../utils/formatDateAndTimeUtils";
import { useUserContext } from "../context/UserContext";
import NotFoundPage from "./NotFoundPage";
import { deleteMessage } from "../api/deleteMessage";
import { readMessage } from "../api/readMessage";

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
              <TableCell>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  textAlign={"center"}
                >
                  View
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Message
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Gender
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Country
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Read
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Date
                </Typography>
              </TableCell>
              {userData.role === "admin" && (
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Delete
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
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
