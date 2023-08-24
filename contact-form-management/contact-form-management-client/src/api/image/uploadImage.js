import axios from "axios";
import { strapi } from "../../server/server";

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("files", image);

    const response = await axios.post(`${strapi}/api/upload/`, formData);

    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data.error.name);
  }
};
