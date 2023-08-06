import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/addUser";
import Navbar from "./Navbar";
import { MuiFileInput } from "mui-file-input";
import useFileInput from "../utils/base64PhotoUtils";

import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";

import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import hire from "../images/hire.svg";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //photo
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [photoError, setPhotoError] = useState("");

  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  const { file, base64Photo, handleChange } = useFileInput();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userData = { username, password, base64Photo };

    try {
      await addUser(token, userData);
      navigate("/users");
    } catch (error) {
      if (error === "Username is required") {
        setUsernameError(error);
      } else if (error === "Password is required") {
        setPasswordError(error);
      } else if (error === "Photo is required") {
        setPhotoError(error);
      } else {
        setUsernameError(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "90vh" }}
      >
        <Grid item xs={10} sm={6} md={5}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={hire}
                  alt="logo"
                  style={{ height: 200, width: 200 }}
                />
              </Box>
              <Typography
                variant="h4"
                align="center"
                sx={{ color: "#154c79", marginBottom: 4 }}
              >
                {translations.usersPage.userFormTitle}
              </Typography>
              <TextField
                label={translations.usersPage.username}
                variant="outlined"
                error={Boolean(usernameError)}
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                inputProps={{ maxLength: 10 }}
                helperText={usernameError}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label={translations.usersPage.password}
                variant="outlined"
                error={Boolean(passwordError)}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{ maxLength: 10 }}
                helperText={passwordError}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label={translations.usersPage.role}
                variant="outlined"
                defaultValue="Reader"
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
              />
              <MuiFileInput value={file} onChange={handleChange} />
              {photoError && (
                <Typography variant="body2" color="red">
                  {photoError}
                </Typography>
              )}
            </CardContent>

            <CardActions>
              <Box width="100%" display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginBottom: 2 }}
                  onClick={handleSubmit}
                >
                  {translations.usersPage.createButton}
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UserForm;