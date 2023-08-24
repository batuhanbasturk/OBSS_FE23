import { useState, useEffect } from "react";
//api
import { fetchCountries } from "../api/fetchCountries";
import { addMessage } from "../api/message/addMessage";
//snackbar imports
import { useSnackbar } from "../utils/snackbarUtils";
// language imports
import { useLanguageContext } from "../context/LanguageContext";
import { useImageContext } from "../context/ImageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//theme
import { useThemeContext } from "../context/ThemeContext";
//strapi
import { strapi } from "../server/server";
//UI
import styles from "../styles/Home.module.css";
import {
  Grid,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  InputLabel,
  FormHelperText,
} from "@mui/material";

const ContactForm = () => {
  // Form state
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  // Error state
  const [errors, setErrors] = useState({
    name: "",
    gender: "",
    country: "",
    message: "",
  });
  // Language state
  const { language } = useLanguageContext();
  const { images } = useImageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;
  // Snackbar state
  const { handleSnackbarOpen, SnackbarComponent } = useSnackbar();
  //theme
  const { theme } = useThemeContext();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: !name ? translations.contactForm.nameRequired : "",
      gender: !gender ? translations.contactForm.genderRequired : "",
      country: !country ? translations.contactForm.countryRequired : "",
      message: !message ? translations.contactForm.messageRequired : "",
    };
    setErrors(newErrors);
    const formData = { name, gender, country, message };

    try {
      await addMessage(formData);
      // success snackbar
      handleSnackbarOpen(translations.contactForm.successMessage, "success");
      // reset form
      setName("");
      setCountry("");
      setMessage("");
      setGender("");
    } catch (error) {}
  };
  // Fetch countries
  useEffect(() => {
    const getCountries = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);
      } catch (error) {
        console.log(error);
      }
    };
    getCountries();
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={
        theme === "dark" ? styles.container_dark : styles.container_light
      }
    >
      <Grid item xs={10} sm={6} md={5}>
        <Box className={styles.logoContainer}>
          {/* Logo */}
          <img
            src={`${strapi}${images["contact"]?.url}`}
            alt="logo"
            className={styles.logoImage}
          />
        </Box>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            {/* Title */}
            <Typography variant="h4" align="center" gutterBottom>
              {translations.contactForm.title}
            </Typography>
            {/* Name */}
            <TextField
              label={translations.contactForm.nameLabel}
              variant="outlined"
              error={Boolean(errors.name)}
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{ maxLength: 50 }}
              helperText={errors.name}
            />
            {/* Gender */}
            <FormControl
              component="fieldset"
              error={Boolean(errors.gender)}
              sx={{ mt: 2 }}
            >
              <FormLabel component="legend">
                {translations.contactForm.genderLabel}
              </FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value={"male"}
                  control={<Radio />}
                  label={translations.contactForm.maleOption}
                />
                <FormControlLabel
                  value={"female"}
                  control={<Radio />}
                  label={translations.contactForm.femaleOption}
                />
              </RadioGroup>
              {errors.gender && (
                <Typography
                  variant="caption"
                  className={
                    theme === "light"
                      ? styles.errorMsgLight
                      : styles.errorMsgDark
                  }
                >
                  {errors.gender}
                </Typography>
              )}
            </FormControl>

            {/* Country */}
            <FormControl
              fullWidth
              error={Boolean(errors.country)}
              sx={{ mt: 2 }}
            >
              <InputLabel>{translations.contactForm.countryLabel}</InputLabel>
              <Select
                label={translations.contactForm.countryLabel}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                displayEmpty
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
              {errors.country && (
                <FormHelperText>{errors.country}</FormHelperText>
              )}
            </FormControl>
            {/* Message */}
            <TextareaAutosize
              aria-label="Message"
              placeholder={translations.contactForm.messageLabel}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              inputProps={{ maxLength: 500 }}
              className={styles.textArea}
              style={{
                border: errors.message ? "1px solid #d32f2f" : "1px solid #ccc",
                backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
                color: theme === "dark" ? "#ffffff" : "#000000",
              }}
            />
            {/* Error message */}
            {errors.message && (
              <Typography
                variant="caption"
                className={
                  theme === "dark" ? styles.errorMsgDark : styles.errorMsgLight
                }
              >
                {errors.message}
              </Typography>
            )}
          </CardContent>
          {/* Submit button */}
          <CardActions>
            <Box width="100%" display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ marginBottom: 2 }}
                onClick={handleSubmit}
              >
                {translations.contactForm.submitButton}
              </Button>
            </Box>
            {/* Snackbar */}
            <SnackbarComponent />
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
