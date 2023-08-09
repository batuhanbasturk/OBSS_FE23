import { useState } from "react";
//navigation
import { useNavigate, useLocation } from "react-router-dom";
//api
import { login } from "../api/login/login";
//UI
import { Grid, Box, TextField, Button } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import logo from "../images/obss.png";
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
  const location = useLocation();
  const errorMessage = new URLSearchParams(location.search).get("error");

  const { setUserData } = useUserContext();
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
      if (err.includes("Username")) {
        setUsernameError(err);
        setPasswordError("");
      } else if (err.includes("Password")) {
        setPasswordError(err);
        setUsernameError("");
      }
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center" height="100vh">
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: "5px",
          maxWidth: "400px",
          width: "100%",
          bg: "white",
        }}
      >
        {/*Login Logo*/}
        <img src={logo} alt="logo" width="100%" style={{ paddingBottom: 20 }} />
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
        {errorMessage && (
          <Box style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </Box>
        )}
        {/*Login Button*/}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            background: "linear-gradient(315deg, #003f5e, #22a9e0)",
          }}
        >
          {translations.loginPage.loginButton}
        </Button>
      </Box>
    </Grid>
  );
};

export default LoginPage;
