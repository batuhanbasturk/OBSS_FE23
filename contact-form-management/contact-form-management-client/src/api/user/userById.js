import axios from "axios";
import { server } from "../../constants/server";

export const getUserById = async (userId, token) => {
  try {
    const response = await axios.get(`${server}/api/user/${userId}`, {
      headers: {
        token: `${token}`,
      },
    });
    return response.data.data.user;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};
