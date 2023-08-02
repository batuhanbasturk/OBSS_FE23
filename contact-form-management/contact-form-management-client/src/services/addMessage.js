import axios from "axios";
import { server } from "../constants/server";

export const addMessage = (formData) => {
  const { name, message, gender, country } = formData;
  return axios
    .post(`${server}/api/message/add`, { name, message, gender, country })
    .then((response) => {
      const data = response.data;
      console.log(data);
      return data;
    })
    .catch((error) => {
      return Promise.reject(error.response.data.error);
    });
};
