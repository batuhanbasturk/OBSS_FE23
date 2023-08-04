import { server } from "../constants/server";
import axios from "axios";

// POST /api/user/login: Login user.
export const login = (username, password) => {
  return axios
    .post(`${server}/api/user/login`, { username, password })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return Promise.reject(error.response.data.error);
    });
};
