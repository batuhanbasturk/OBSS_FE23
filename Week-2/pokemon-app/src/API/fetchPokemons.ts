import { initialUrl } from "../constants";
import {
  getPokemonList,
  fetchPokemonDetails,
} from "../services/pokemon.services";

const fetchPokemons = async (url: string = initialUrl) => {
  const { results, next } = await getPokemonList(url).catch(() => ({
    results: [],
    next: "",
  }));

  const pokemonDetailsPromises = results.map(async (pokemon) => {
    const response = await fetchPokemonDetails(pokemon.url);
    return response;
  });

  return {
    results: await Promise.all(pokemonDetailsPromises),
    next: next ?? "",
  };
};

export default fetchPokemons;
