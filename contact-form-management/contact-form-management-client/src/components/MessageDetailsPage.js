// MessageDetailsPage.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessageById } from "../services/messageById";
import { formatDateAndTime } from "../utils/formatDateAndTime";
import NotFoundPage from "./NotFoundPage";

const MessageDetailsPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState({});
  const [notFoundError, setNotFoundError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchMessageById = async () => {
      try {
        const message = await getMessageById(id, token);
        console.log(message.creationDate);
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
    <div>
      <h1>Message Details</h1>
      <p>ID: {message.id}</p>
      <p>Name: {message.name}</p>
      <p>Message: {message.message}</p>
      <p>Gender: {message.gender}</p>
      <p>Country: {message.country}</p>
      <p>Read: {message.read}</p>
      <p>Date: {message.creationDate}</p>
    </div>
    //Need to solve bug about date
  );
};

export default MessageDetailsPage;
