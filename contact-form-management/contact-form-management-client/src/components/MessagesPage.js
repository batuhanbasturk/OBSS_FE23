import React, { useState, useEffect } from "react";
import { fetchMessages } from "../services/fetchMessages";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { formatDateAndTime } from "../utils/formatDateAndTime";
import { useUserContext } from "../context/UserContext";
import NotAuthorizedPage from "./NotAuthorizedPage";
import { deleteMessage } from "../services/deleteMessage";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import ReadIcon from "@mui/icons-material/Visibility";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { userData } = useUserContext();

  const handleViewMessageDetails = (id) => {
    navigate(`/message/${id}`);
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
    return <NotAuthorizedPage error={errorMessage} />;
  }
  return (
    <>
      <Navbar />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>View</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Read</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell onClick={() => handleViewMessageDetails(message.id)}>
                  <ReadIcon />
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      Delete
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
