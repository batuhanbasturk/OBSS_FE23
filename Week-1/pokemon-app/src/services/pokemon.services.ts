import axios from "axios";
import { PokemonList, PokemonDetails } from "../../src/types";

const getPokemonList = (url: string) => {
  return axios.get<PokemonList>(url).then((res) => res.data);
};
const fetchPokemonDetails = (url: string) => {
  return axios.get<PokemonDetails>(url).then((res) => res.data);
};

export { getPokemonList, fetchPokemonDetails };
