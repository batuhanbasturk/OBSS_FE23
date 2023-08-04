import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessageById } from "../api/messageById";
import { formatDateAndTime } from "../utils/formatDateAndTimeUtils";
import NotFoundPage from "./NotFoundPage";
import Navbar from "./Navbar";

import Details from "../images/details.svg";
import { Card, CardContent, Typography, Box } from "@mui/material";

const MessageDetailsPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState({});
  const [notFoundError, setNotFoundError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchMessageById = async () => {
      try {
        const message = await getMessageById(id, token);
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
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "92vh",
        }}
      >
        <img src={Details} alt="details" style={{ marginBottom: "20px" }} />
        <Card variant="outlined" sx={{ maxWidth: "400px", width: "100%" }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              ID: {message.id}
            </Typography>
            <Typography color="textSecondary">Name: {message.name}</Typography>
            <Typography color="textSecondary" gutterBottom>
              Message: {message.message}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Gender: {message.gender}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Country: {message.country}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Read: {message.read}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Date: {formatDateAndTime(message.creationDate)}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default MessageDetailsPage;
