import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../api/userById";
import { fetchUsers } from "../api/fetchUsers";

import NotFoundPage from "./NotFoundPage";
import Navbar from "./Navbar";

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
                  sx={{ paddingLeft: 3 }}
                >
                  Edit
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Username
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Role
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Password
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Image
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
                    alt="User"
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
        <PersonAddIcon />
      </Button>
    </>
  );
};

export default UserPage;
