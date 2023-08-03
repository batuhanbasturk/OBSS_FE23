import React, { useState, useEffect } from "react";
import { fetchMessages } from "../services/fetchMessages";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { formatDateAndTime } from "../utils/formatDateAndTime";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleViewMessageDetails = (id) => {
    navigate(`/message/${id}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getMessages = async () => {
      try {
        const messagesData = await fetchMessages(token);
        setMessages(messagesData);
      } catch (error) {
        console.error(error);
      }
    };

    getMessages();
  }, []);

  return (
    <div>
      <Navbar />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Read</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                key={message.id}
                onClick={() => handleViewMessageDetails(message.id)}
              >
                <TableCell>{message.id}</TableCell>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.message}</TableCell>
                <TableCell>{message.gender}</TableCell>
                <TableCell>{message.country}</TableCell>
                <TableCell>{message.read}</TableCell>
                <TableCell style={{ whiteSpace: "pre-line" }}>
                  {formatDateAndTime(message.creationDate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MessagesPage;
