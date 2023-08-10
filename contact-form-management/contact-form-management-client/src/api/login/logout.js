import axios from "axios";
import { server } from "../../server/server";
export const logout = (token) => {
  return axios
    .post(
      `${server}/api/user/logout`,
      {},
      {
        headers: { token: token },
      }
    )
    .then((response) => {
      return response.data.data.message;
    })
    .catch((error) => {
      return Promise.reject(error.response.data.error);
    });
};
