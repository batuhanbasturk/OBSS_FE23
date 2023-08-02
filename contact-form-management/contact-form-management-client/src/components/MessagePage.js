import React, { useState, useEffect } from "react";
import { fetchMessages } from "../services/fetchMessages";
import Navbar from "./Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const MessagePage = () => {
  const [messages, setMessages] = useState([]);

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

  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", optionsDate).format(
      date
    );
    const formattedTime = new Intl.DateTimeFormat("en-US", optionsTime).format(
      date
    );
    return `${formattedDate}\n${formattedTime}`;
  };

  return (
    <div>
      <Navbar />
      <h1>Contact Form Messages</h1>
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
              <TableRow key={message.id}>
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

export default MessagePage;
