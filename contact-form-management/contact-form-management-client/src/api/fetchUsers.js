import axios from "axios";
import { server } from "../constants/server";

export const fetchUsers = async (token) => {
  try {
    const response = await axios.get(`${server}/api/users`, {
      headers: {
        token: `${token}`,
      },
    });
    return response.data.data.users;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};
