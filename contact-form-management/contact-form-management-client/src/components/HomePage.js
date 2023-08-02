import React, { useState, useEffect } from "react";
import { fetchCountries } from "../services/fetchCountries";
import { addMessage } from "../services/addMessage";
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
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorCountry, setErrorCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    } catch (error) {
      if (error.includes("Name")) {
        setErrorName(error);
      } else if (error.includes("Country")) {
        setErrorCountry(error);
      } else if (error.includes("Message")) {
        setErrorMessage(error);
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
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              sx={{ color: "#154c79" }}
              gutterBottom
            >
              Contact Form
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              error={Boolean(errorName)}
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              helperText={errorName}
            />
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth error={Boolean(errorCountry)} sx={{ mt: 2 }}>
              <InputLabel>Select your country</InputLabel>
              <Select
                label="Select your country"
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
            <TextareaAutosize
              aria-label="Message"
              placeholder="Message"
              error={Boolean(errorMessage)}
              value={message}
              helperText={errorMessage}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: "100%",
                marginTop: "16px",
                height: "100px",
                border: errorMessage ? "1px solid red" : "1px solid #ccc",
              }}
            />
            {errorMessage && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errorMessage}
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
                Submit
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
