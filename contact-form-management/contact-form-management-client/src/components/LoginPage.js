import { useState } from "react";
//navigation
import { useNavigate } from "react-router-dom";
//api
import { login } from "../api/login/login";
//UI
import { Grid, Box, TextField, Button } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import styles from "../styles/Login.module.css";
//context
import { useUserContext } from "../context/UserContext";
import { useLanguageContext } from "../context/LanguageContext";
//strapi
import { strapi } from "../server/server";
//images
import { useImageContext } from "../context/ImageContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const { images } = useImageContext();

  const { setUserData, tokenError } = useUserContext();
  const { labels } = useLanguageContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");
    setLoginError("");

    let hasError = false;

    if (!username) {
      setUsernameError(labels.usernameRequired);
      hasError = true;
    }

    if (!password) {
      setPasswordError(labels.passwordRequired);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const fullData = await login(username, password);
      const user = fullData.user;
      const token = fullData.token;
      setUserData(user);

      localStorage.setItem("token", token);
      navigate("/welcome");
    } catch (error) {
      if (
        error === "Username does not exist" ||
        error === "Password is incorrect"
      ) {
        setLoginError(labels.loginError);
      } else {
        setLoginError("Something went wrong!");
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
        <img
          src={`${strapi}${images["obss"]?.url}`}
          alt="logo"
          className={styles.logoImage}
        />
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <AccountBoxIcon />
          </Grid>
          <Grid item xs>
            {/*Username*/}
            <TextField
              error={Boolean(usernameError)}
              label={labels.usernameLabel}
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
              label={labels.passwordLabel}
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              helperText={passwordError}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        {/*Invalid login error message */}
        {loginError && <Box className={styles.errorBox}>{loginError}</Box>}
        {/*Check login's error message*/}
        {tokenError && <Box className={styles.errorBox}>{tokenError}</Box>}
        {/*Login Button*/}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.loginButton}
        >
          {labels.loginButton}
        </Button>
      </Box>
    </Grid>
  );
};

export default LoginPage;
