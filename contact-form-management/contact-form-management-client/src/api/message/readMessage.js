import axios from "axios";
import { server } from "../../server/server";

export const readMessage = async (id, token) => {
  try {
    const response = await axios.post(
      `${server}/api/message/read/${id}`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data.data.message.id;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};
