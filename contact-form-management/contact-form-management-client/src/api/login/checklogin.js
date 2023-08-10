import axios from "axios";
import { server } from "../../server/server";

export const checkLogin = (token) => {
  return axios
    .post(
      `${server}/api/user/check-login`,
      {},
      {
        headers: { token: token },
      }
    )
    .then((response) => {
      return response.data.data.user;
    })
    .catch((error) => {
      return Promise.reject(error.response.data.error);
    });
};
