import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon, PokemonDetails } from "../types";
import { getPokemonList } from "../services/pokemon.service";
import ListItem from "../components/ListItem";
import Details from "../components/Details";

const Api = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null,
  );

  const fetchPokemons = async (
    url: string = "https://pokeapi.co/api/v2/pokemon/",
  ) => {
    const { results, next } = await getPokemonList(url);

    setPokemonList([...pokemonList, ...results]);
    setNextUrl(next);
  };

  const fetchPokemonDetails = async (url: string) => {
    const response = await axios.get<PokemonDetails>(url);
    setSelectedPokemon(response.data);
  };

  const handleLoadMore = () => {
    if (nextUrl) {
      fetchPokemons(nextUrl);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      {pokemonList.map((pokemon, index) => (
        <div key={index}>
          {pokemon.name}
          <button onClick={() => fetchPokemonDetails(pokemon.url)}>
            Details
          </button>
        </div>
      ))}
      {nextUrl && <button onClick={handleLoadMore}>Load More</button>}

      {selectedPokemon && <Details selectedPokemon={selectedPokemon} />}
    </div>
  );
};

export default Api;
