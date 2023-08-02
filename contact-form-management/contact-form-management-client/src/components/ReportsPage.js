import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMessages } from "../services/fetchMessages";

import { Bar, Pie } from "react-chartjs-2";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Navbar from "./Navbar";

const ReportsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const countriesToShow = 8;

  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // Chart data
  const getVisibleCountries = () => {
    return countryChartData.labels.slice(
      currentIndex,
      currentIndex + countriesToShow
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch messages if authenticated
    const getMessages = async () => {
      try {
        const messagesData = await fetchMessages(token);
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [navigate]);

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
          height: "100vh",
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                  Message Count by Country
                </Typography>
                <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
                  <Bar
                    data={{
                      labels: getVisibleCountries(),
                      datasets: [
                        {
                          label: "Message Count",
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
                Message Count by Gender
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
                  <Pie
                    data={{
                      labels: genderChartData.labels,
                      datasets: [
                        {
                          data: genderChartData.data,
                          backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
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
    </>
  );
};

export default ReportsPage;
