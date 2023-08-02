import Navbar from "./Navbar";
import { useUserContext } from "../context/UserContext";
import greetings from "../images/greetings.svg";
import { Container, Typography } from "@mui/material";
const WelcomePage = () => {
  const { userData } = useUserContext();
  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <img src={greetings} alt="Greetings" />
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome {userData.username}
        </Typography>
      </Container>
    </>
  );
};

export default WelcomePage;
