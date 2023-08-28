import axios from "axios";
import { strapi } from "../../server/server";

export const updateImage = async (id, image) => {
  try {
    const formData = new FormData();
    formData.append("files", image);
    const response = await axios.post(
      `${strapi}/api/upload?id=${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
