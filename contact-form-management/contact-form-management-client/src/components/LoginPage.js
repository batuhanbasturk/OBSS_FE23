import { useState } from "react";
//navigation
import { useNavigate } from "react-router-dom";
//api
import { login } from "../api/login/login";
//UI
import { Grid, Box, TextField, Button } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import logo from "../images/obss.png";
import styles from "../styles/Login.module.css";
//context
import { useUserContext } from "../context/UserContext";
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const { setUserData, tokenError } = useUserContext();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const fullData = await login(username, password);
      const user = fullData.user;
      const token = fullData.token;
      setUserData(user);

      localStorage.setItem("token", token);
      if (!token) {
        navigate("/login");
        return;
      }
      navigate("/welcome");
    } catch (err) {
      if (err === "Username is required") {
        setUsernameError(err);
        setPasswordError("");
      } else if (err === "Password is required") {
        setPasswordError(err);
        setUsernameError("");
      }
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center" height="97vh">
      <Box
        component="form"
        onSubmit={handleLogin}
        className={styles.loginContainer}
      >
        {/*Login Logo*/}
        <img src={logo} alt="logo" className={styles.logoImage} />
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <AccountBoxIcon />
          </Grid>
          <Grid item xs>
            {/*Username*/}
            <TextField
              error={Boolean(usernameError)}
              label={translations.loginPage.usernameLabel}
              variant="outlined"
              fullWidth
              value={username}
              helperText={usernameError}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <LockOpenIcon />
          </Grid>
          <Grid item xs>
            {/*Password*/}
            <TextField
              error={Boolean(passwordError)}
              label={translations.loginPage.passwordLabel}
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              helperText={passwordError}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        {/*Check login's error message*/}
        {tokenError && <Box className={styles.errorBox}>{tokenError}</Box>}
        {/*Login Button*/}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.loginButton}
        >
          {translations.loginPage.loginButton}
        </Button>
      </Box>
    </Grid>
  );
};

export default LoginPage;
