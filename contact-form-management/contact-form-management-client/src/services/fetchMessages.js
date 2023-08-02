import axios from "axios";
import { server } from "../constants/server";

export const fetchMessages = async (token) => {
  const response = await axios.get(`${server}/api/messages`, {
    headers: {
      token: `${token}`,
    },
  });
  return response.data.data.messages;
};
