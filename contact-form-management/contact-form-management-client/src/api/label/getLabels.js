import axios from "axios";
import { strapi } from "../../server/server";

export const getLabels = async (locale) => {
  try {
    const response = await axios.get(`${strapi}/api/label`, {
      params: {
        locale: locale,
      },
    });
    return response.data.data.attributes;
  } catch (error) {
    console.log(error);
  }
};
