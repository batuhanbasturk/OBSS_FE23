import { useState } from "react";
//navigation
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
//api
import { addUser } from "../api/user/addUser";
//File handler
import { MuiFileInput } from "mui-file-input";
import useFileInput from "../utils/base64PhotoUtils";
//context
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//UI
import styles from "../styles/UserForm.module.css";
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
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    photo: "",
  });

  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  const { file, base64Photo, handleChange } = useFileInput();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      username: !username ? translations.contactForm.nameRequired : "",
      password: !password ? translations.usersPage.passwordRequired : "",
      photo: !file ? translations.usersPage.photoRequired : "",
    };
    setErrors(newErrors);
    const token = localStorage.getItem("token");
    const userData = { username, password, base64Photo };

    try {
      await addUser(token, userData);
      navigate("/users");
    } catch (error) {
      if (error === "Username already exists") {
        setErrors({
          ...errors,
          username: translations.usersPage.usernameExists,
        });
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
        height={"90vh"}
      >
        <Grid item xs={10} sm={6} md={5}>
          <Card className={styles.card}>
            <CardContent>
              <Box sx={{ textAlign: "center" }}>
                {/* Logo */}
                <img className={styles.logo} src={hire} alt="logo" />
              </Box>
              {/* Form title*/}
              <Typography
                variant="h4"
                align="center"
                sx={{ color: "#154c79", marginBottom: 4 }}
              >
                {translations.usersPage.userFormTitle}
              </Typography>
              {/* Username */}
              <TextField
                label={translations.usersPage.username}
                variant="outlined"
                error={Boolean(errors.username)}
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                inputProps={{ maxLength: 10 }}
                helperText={errors.username}
                sx={{ marginBottom: 2 }}
              />
              {/* Password */}
              <TextField
                label={translations.usersPage.password}
                variant="outlined"
                error={Boolean(errors.password)}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{ maxLength: 10 }}
                helperText={errors.password}
                sx={{ marginBottom: 2 }}
              />
              {/* Role */}
              <TextField
                label={translations.usersPage.role}
                variant="outlined"
                defaultValue="Reader"
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
              />
              {/* Photo */}
              <MuiFileInput value={file} onChange={handleChange} />
              {/* Photo Error */}
              {errors.photo && (
                <Typography variant="body2" className={styles.errorPhoto}>
                  {errors.photo}
                </Typography>
              )}
            </CardContent>
            {/* Create Button */}
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
