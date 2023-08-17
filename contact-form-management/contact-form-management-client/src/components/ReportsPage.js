import { useCallback, useEffect, useState } from "react";
//navigation
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
//api
import { fetchMessages } from "../api/message/fetchMessages";
//chart library
import { Bar, Pie } from "react-chartjs-2";
//context
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//socket
import { w3cwebsocket as W3CWebSocket } from "websocket";
//snackbar
import { useSnackbar } from "../utils/snackbarUtils";
//UI
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ReportsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const countriesToShow = 8;

  const [messages, setMessages] = useState([]);
  const { handleSnackbarOpen, SnackbarComponent } = useSnackbar();
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  // Chart data
  const getVisibleCountries = () => {
    return countryChartData.labels.slice(
      currentIndex,
      currentIndex + countriesToShow
    );
  };

  const getMessages = useCallback(async () => {
    console.log(navigate);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const messagesData = await fetchMessages(token);
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [navigate]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  useEffect(() => {
    const ws = new W3CWebSocket("ws://localhost:5165");

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.type === "dataUpdate") {
        // Append new message to existing messages and set the updated array
        setMessages((prevMessages) => [...prevMessages, newMessage.message]);
      }
    };
    // Show snackbar when a new message is received
    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "dataUpdate") {
        handleSnackbarOpen(
          translations.newMessage +
            data.message.name +
            ": " +
            data.message.message
        );
      }
    });
    return () => {
      ws.close();
    };
  }, [translations.newMessage, handleSnackbarOpen]);

  // Function to calculate message count for each country
  const getMessageCountByCountry = () => {
    const countryCountMap = new Map();
    messages.forEach((message) => {
      const country = message.country;
      if (countryCountMap.has(country)) {
        countryCountMap.set(country, countryCountMap.get(country) + 1);
      } else {
        countryCountMap.set(country, 1);
      }
    });
    return Array.from(countryCountMap.entries())
      .sort((a, b) => b[1] - a[1])
      .reduce(
        (acc, [country, count]) => {
          acc.labels.push(country);
          acc.data.push(count);
          return acc;
        },
        { labels: [], data: [] }
      );
  };

  // Function to calculate message count for each gender
  const getMessageCountByGender = () => {
    const genderCountMap = new Map();
    messages.forEach((message) => {
      const gender = message.gender;
      if (genderCountMap.has(gender)) {
        genderCountMap.set(gender, genderCountMap.get(gender) + 1);
      } else {
        genderCountMap.set(gender, 1);
      }
    });
    return {
      labels: Array.from(genderCountMap.keys()),
      data: Array.from(genderCountMap.values()),
    };
  };

  const countryChartData = getMessageCountByCountry();
  const genderChartData = getMessageCountByGender();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "96vh",
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                  {/* Bar chart title */}
                  {translations.reportsPage.barChartTitle}
                </Typography>
                <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
                  {/* Bar chart */}
                  <Bar
                    data={{
                      labels: getVisibleCountries(),
                      datasets: [
                        {
                          label: translations.reportsPage.barChartLabel,
                          data: countryChartData.data.slice(
                            currentIndex,
                            currentIndex + countriesToShow
                          ),
                          backgroundColor: "#22a9e0",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          precision: 0,
                        },
                      },
                    }}
                  />
                </Box>
                {/* Pagination buttons */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    disabled={currentIndex === 0}
                    onClick={() =>
                      setCurrentIndex(currentIndex - countriesToShow)
                    }
                  >
                    <ArrowBackIcon />
                  </Button>
                  <Button
                    disabled={
                      currentIndex + countriesToShow >=
                      countryChartData.labels.length
                    }
                    onClick={() =>
                      setCurrentIndex(currentIndex + countriesToShow)
                    }
                  >
                    <ArrowForwardIcon />
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {/* Pie chart title */}
                {translations.reportsPage.pieChartTitle}
              </Typography>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ height: "300px", width: "300px" }}>
                  {/* Pie chart */}
                  <Pie
                    data={{
                      labels: genderChartData.labels,
                      datasets: [
                        {
                          data: genderChartData.data,
                          backgroundColor: [
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                          ],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <SnackbarComponent type="info" />
    </>
  );
};

export default ReportsPage;
