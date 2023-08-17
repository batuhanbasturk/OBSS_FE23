import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
//api
import { getUserById } from "../api/user/userById";
import { fetchUsers } from "../api/user/fetchUsers";
//error
import NotFoundPage from "./NotFoundPage";
//context
import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";
//UI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Avatar,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

const UserPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddUser = () => {
    navigate("/user/add");
  };

  const handleViewUserDetails = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await getUserById(id, token);
      navigate(`/user/${id}`);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getUsers = async () => {
      try {
        const usersData = await fetchUsers(token);
        setUsers(usersData);
      } catch (error) {
        setErrorMessage(error);
      }
    };
    getUsers();
  }, []);

  if (errorMessage) {
    return <NotFoundPage error={errorMessage} />;
  }
  return (
    <>
      <Navbar />
      <Box
        sx={{
          margin: 2,
        }}
      >
        <TextField
          type="text"
          InputProps={{
            style: { height: "5vh", width: "18rem" },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label={translations.usersPage.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Edit*/}
              <TableCell>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={
                    language === "en" ? { paddingLeft: 2 } : { paddingLeft: 0 }
                  }
                >
                  {translations.usersPage.edit}
                </Typography>
              </TableCell>
              {/* Id */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.usersPage.id}
                </Typography>
              </TableCell>
              {/* Username */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.usersPage.username}
                </Typography>
              </TableCell>
              {/* Role */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.usersPage.role}
                </Typography>
              </TableCell>
              {/* Password */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.usersPage.password}
                </Typography>
              </TableCell>
              {/* Image */}
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.usersPage.image}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {/* user fetch */}
          <TableBody>
            {users
              .filter((user) =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell onClick={() => handleViewUserDetails(user.id)}>
                    <Button>
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <Avatar
                      alt={translations.usersPage.image}
                      src={user.base64Photo}
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add User Button */}
      <Button sx={{ margin: 2 }} onClick={handleAddUser}>
        {translations.usersPage.add}
        <PersonAddIcon />
      </Button>
    </>
  );
};

export default UserPage;
