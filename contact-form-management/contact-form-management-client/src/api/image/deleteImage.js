import axios from "axios";
import { strapi } from "../../server/server";

export const deleteImage = async (id) => {
  // delete image from strapi
  try {
    const response = await axios.delete(`${strapi}/api/upload/files/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log("error deleting image: ", error);
  }
};
