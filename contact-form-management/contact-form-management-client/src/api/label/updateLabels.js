import axios from "axios";
import { strapi } from "../../server/server";

export const updateLabels = async (lang, labels) => {
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzMjAyOTcwLCJleHAiOjE2OTU3OTQ5NzB9.wR6EzxsYsZa7qu_yWAd93d-ltN3-26_ksR53OBfyoO8";
  try {
    const response = await axios.put(
      `${strapi}/content-manager/single-types/api::label.label?plugins[i18n][locale]=${lang}`,
      labels,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
