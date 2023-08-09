import axios from "axios";
import { server } from "../../constants/server";

export const getMessageById = async (id, token) => {
  try {
    const response = await axios.get(`${server}/api/message/${id}`, {
      headers: {
        token: `${token}`,
      },
    });
    return response.data.data.message;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};
