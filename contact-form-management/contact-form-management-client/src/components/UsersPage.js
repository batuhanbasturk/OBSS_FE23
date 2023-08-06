import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../api/userById";
import { fetchUsers } from "../api/fetchUsers";

import NotFoundPage from "./NotFoundPage";
import Navbar from "./Navbar";

import { useLanguageContext } from "../context/LanguageContext";
import trTranslations from "../translations/tr";
import enTranslations from "../translations/en";

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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const UserPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const translations = language === "tr" ? trTranslations : enTranslations;

  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
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
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.usersPage.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.usersPage.username}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.usersPage.role}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.usersPage.password}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {translations.usersPage.image}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
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
      <Button sx={{ margin: 2 }} onClick={handleAddUser}>
        {translations.usersPage.add}
        <PersonAddIcon />
      </Button>
    </>
  );
};

export default UserPage;
