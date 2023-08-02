import React, { useState, useEffect } from "react";
import { fetchMessages } from "../services/fetchMessages";

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

  return (
    <div>
      <h1>Contact Form Messages</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Message</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Read</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.name}</td>
              <td>{message.message}</td>
              <td>{message.gender}</td>
              <td>{message.country}</td>
              <td>{message.read}</td>
              <td>{message.creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessagePage;
