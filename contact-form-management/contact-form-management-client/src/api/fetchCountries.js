import axios from "axios";
import { server } from "../server/server";

// GET /api/countries: Fetch all countries.
export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${server}/api/countries`);
    return response.data.data.countries;
  } catch (error) {
    return await Promise.reject(error.response.data.error);
  }
};
