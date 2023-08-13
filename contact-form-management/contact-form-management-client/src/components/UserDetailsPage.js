import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//api
import { getUserById } from "../api/user/userById";
import { updateUser } from "../api/user/updateUser";
//utils
import { useSnackbar } from "../utils/snackbarUtils";
//components
import Navbar from "./Navbar";
import NotFoundPage from "./NotFoundPage";
//File handler
import useFileInput from "../utils/base64PhotoUtils";
import { MuiFileInput } from "mui-file-input";
//context
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//UI
import styles from "../styles/userDetails.module.css";
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

  const [notFoundError, setNotFoundError] = useState("");
  const [errors, setErrors] = useState({
    photo: "",
    password: "",
    notFound: "",
  });
  //utils
  const { file, base64Photo, handleChange } = useFileInput();
  const { handleSnackbarOpen, SnackbarComponent } = useSnackbar();

  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  const handleUpdateUser = async () => {
    const newErrors = {
      photo: !file ? translations.usersPage.photoRequired : "",
      password: !password ? translations.usersPage.passwordRequired : "",
    };
    setErrors(newErrors);

    const token = localStorage.getItem("token");
    try {
      const data = { username, password, base64Photo };
      const user = await updateUser(token, id, data);
      setUser(user);
      handleSnackbarOpen(translations.usersPage.updateSnackbarMessage);
    } catch (error) {
      if (error === "User not found") {
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
      <Box className={styles.container}>
        <Card variant="outlined" className={styles.card}>
          <CardContent>
            {/* User Image */}
            <Avatar
              alt={translations.usersPage.image}
              src={user.base64Photo}
              className={styles.userImage}
            />
            {/* User Id */}
            <Typography variant="h5" component="h2" gutterBottom>
              {translations.usersPage.id}: {user.id}
            </Typography>
            {/* User Name */}
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
            {/* User Password */}
            <TextField
              label={translations.usersPage.password}
              variant="outlined"
              value={password}
              error={Boolean(errors.password)}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              helperText={errors.password}
              inputProps={{ maxLength: 10 }}
            />
            {/* User Role */}
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
            {/* User Photo Update*/}
            <MuiFileInput
              value={file}
              onChange={handleChange}
              margin="normal"
            />
            {/* Photo Error */}
            {errors.photo && (
              <Typography variant="body2" className={styles.errorPhoto}>
                {errors.photo}
              </Typography>
            )}
            <Typography color="textSecondary" gutterBottom></Typography>
            {/* Update Button */}
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
