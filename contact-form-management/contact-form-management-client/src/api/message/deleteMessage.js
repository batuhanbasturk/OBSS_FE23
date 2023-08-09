import axios from "axios";
import { server } from "../../constants/server";

export const deleteMessage = async (id, token) => {
  try {
    const response = await axios.post(
      `${server}/api/message/delete/${id}`,
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
