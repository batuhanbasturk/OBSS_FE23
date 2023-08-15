import axios from "axios";
import { server } from "../../server/server";
//currently not using since i did pagination on the server side
export const fetchMessages = async (token) => {
  try {
    const response = await axios.get(`${server}/api/messages`, {
      headers: {
        token: `${token}`,
      },
    });
    return response.data.data.messages;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};
