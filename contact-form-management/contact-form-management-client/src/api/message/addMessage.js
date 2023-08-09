import axios from "axios";
import { server } from "../../constants/server";

export const addMessage = async (formData) => {
  const { name, message, gender, country } = formData;
  try {
    const response = await axios.post(`${server}/api/message/add`, {
      name,
      message,
      gender,
      country,
    });
    const data = response.data;
    return data;
  } catch (error) {
    return await Promise.reject(error.response.data.error);
  }
};
