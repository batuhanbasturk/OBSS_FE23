import axios from "axios";
import { strapi } from "../../server/server";

export const fetchImages = async () => {
  try {
    const response = await axios.get(`${strapi}/api/upload/files`);
    const imagesData = response.data;
    const imagesByName = {};

    imagesData.forEach((image) => {
      imagesByName[image.name] = image;
    });

    return imagesByName;
  } catch (error) {
    return await Promise.reject(error.response.data.error.name);
  }
};
