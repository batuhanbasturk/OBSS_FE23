import axios from "axios";
import { PokemonList } from "../types";

const getPokemonList = (url: string) => {
  return axios.get<PokemonList>(url).then((res) => res.data);
};

export { getPokemonList };
