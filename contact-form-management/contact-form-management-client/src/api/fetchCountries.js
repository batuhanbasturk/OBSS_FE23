import axios from "axios";
import { server } from "../server/server";

// GET /api/countries: Fetch all countries.
export const fetchCountries = () => {
  return axios.get(`${server}/api/countries`).then((response) => {
    return response.data.data.countries;
  });
};
