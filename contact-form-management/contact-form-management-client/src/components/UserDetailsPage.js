import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/userById";
import { updateUser } from "../api/updateUser";
import { useSnackbar } from "../utils/snackbarUtils";
//page
import Navbar from "./Navbar";
import NotFoundPage from "./NotFoundPage";
//File handler
import useFileInput from "../utils/base64PhotoUtils";
import { MuiFileInput } from "mui-file-input";

import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";

import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

const UserDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //photo
  const [passwordError, setPasswordError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [notFoundError, setNotFoundError] = useState("");

  const { file, base64Photo, handleChange } = useFileInput();
  const { handleSnackbarOpen, SnackbarComponent } = useSnackbar();

  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  const handleUpdateUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = { username, password, base64Photo };
      const user = await updateUser(token, id, data);
      setUser(user);
      handleSnackbarOpen(translations.usersPage.updateSnackbarMessage);
    } catch (error) {
      if (error === "Password is required") {
        setPasswordError(error);
      } else if (error === "Photo is required") {
        setPhotoError(error);
      } else {
        setNotFoundError(error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserById = async () => {
      try {
        const user_data = await getUserById(id, token);
        setUser(user_data);
        setUsername(user_data.username);
        setPassword(user_data.password);
      } catch (error) {
        setNotFoundError(error);
      }
    };
    fetchUserById();
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
          height: "90vh",
        }}
      >
        <Card variant="outlined" sx={{ maxWidth: "400px", width: "100%" }}>
          <CardContent>
            <Avatar
              alt={translations.usersPage.image}
              src={user.base64Photo}
              sx={{ width: 200, height: 200, margin: "auto" }}
            />
            <Typography variant="h5" component="h2" gutterBottom>
              {translations.usersPage.id}: {user.id}
            </Typography>
            <TextField
              label={translations.usersPage.username}
              variant="outlined"
              value={user.username}
              fullWidth
              margin="normal"
              disabled
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label={translations.usersPage.password}
              variant="outlined"
              value={password}
              error={Boolean(passwordError)}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              helperText={passwordError}
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              label={translations.usersPage.role}
              variant="outlined"
              value={user.role}
              fullWidth
              disabled
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <MuiFileInput
              value={file}
              onChange={handleChange}
              margin="normal"
            />
            {photoError && (
              <Typography variant="body2" color="red">
                {photoError}
              </Typography>
            )}
            <Typography color="textSecondary" gutterBottom></Typography>
            <Box display="flex" justifyContent="center">
              <Button variant="contained" onClick={handleUpdateUser}>
                {translations.usersPage.updateButton}
              </Button>
            </Box>
            <SnackbarComponent />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default UserDetailsPage;