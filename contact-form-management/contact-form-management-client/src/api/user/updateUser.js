import axios from "axios";
import { server } from "../../server/server";

export const updateUser = async (token, id, data) => {
  const { username, password, base64Photo } = data;
  try {
    const response = await axios.post(
      `${server}/api/user/update/${id}`,
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
    return response.data.data.user;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};
