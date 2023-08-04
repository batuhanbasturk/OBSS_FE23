import axios from "axios";
import { server } from "../constants/server";

export const addUser = async (token, data) => {
  const { username, password, base64Photo } = data;
  try {
    const response = await axios.post(
      `${server}/api/user/add-reader`,
      {
        username,
        password,
        base64Photo,
      },
      {
        headers: {
          token: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};
