import { useState, useEffect } from "react";
//api
import { fetchCountries } from "../api/fetchCountries";
import { addMessage } from "../api/message/addMessage";
//snackbar imports
import { useSnackbar } from "../utils/snackbarUtils";
// language imports
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//UI imports
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
import contact from "../images/contact.svg";

const ContactForm = () => {
  // Form state
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  // Error state
  const [errorName, setErrorName] = useState("");
  const [errorCountry, setErrorCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorGender, setErrorGender] = useState("");
  // Language state
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;
  // Snackbar state
  const { handleSnackbarOpen, SnackbarComponent } = useSnackbar();

  // Fetch countries
  useEffect(() => {
    const getCountries = async () => {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    };

    getCountries();
  }, []);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, gender, country, message };
    try {
      await addMessage(formData);
      // success snackbar
      handleSnackbarOpen(translations.contactForm.successMessage);
      // reset form
      setName("");
      setCountry("");
      setMessage("");
      setGender("");
      setErrorMessage("");
      setErrorName("");
      setErrorCountry("");
      setErrorGender("");
    } catch (error) {
      if (error.includes("Name")) {
        setErrorName(error);
      } else if (error.includes("Country")) {
        setErrorCountry(error);
      } else if (error.includes("Message")) {
        setErrorMessage(error);
      } else if (error.includes("Gender")) {
        setErrorGender(error);
      }
    }
  };

  return (
    <Grid
      sx={{
        background: "linear-gradient(315deg, #003f5e, #22a9e0)",
      }}
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={10} sm={6} md={5}>
        <Box sx={{ textAlign: "center" }}>
          {/* Logo */}
          <img src={contact} alt="logo" style={{ height: 200, width: 200 }} />
        </Box>
        <Card>
          <CardContent>
            {/* Title */}
            <Typography
              variant="h4"
              align="center"
              sx={{ color: "#154c79" }}
              gutterBottom
            >
              {translations.contactForm.title}
            </Typography>
            {/* Name */}
            <TextField
              label={translations.contactForm.nameLabel}
              variant="outlined"
              error={Boolean(errorName)}
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{ maxLength: 50 }}
              helperText={errorName}
            />
            {/* Gender */}
            <FormControl component="fieldset" sx={{ mt: 2 }}>
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
            </FormControl>
            {errorGender && (
              <FormHelperText error>{errorGender}</FormHelperText>
            )}
            {/* Country */}
            <FormControl fullWidth error={Boolean(errorCountry)} sx={{ mt: 2 }}>
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
              {errorCountry && <FormHelperText>{errorCountry}</FormHelperText>}
            </FormControl>
            {/* Message */}
            <TextareaAutosize
              aria-label="Message"
              placeholder={translations.contactForm.messageLabel}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              inputProps={{ maxLength: 500 }}
              style={{
                width: "100%",
                marginTop: "16px",
                maxHeight: "200px",
                minHeight: "100px",
                resize: "vertical",
                border: errorMessage ? "1px solid red" : "1px solid #ccc",
              }}
            />
            {/* Error message */}
            {errorMessage && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errorMessage}
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
              <SnackbarComponent />
            </Box>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
