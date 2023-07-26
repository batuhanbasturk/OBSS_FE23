import React, { useEffect, useState } from "react";
import { PokemonDetails } from "../types";
import {
  getPokemonList,
  fetchPokemonDetails,
} from "../services/pokemon.services";
import DetailsCard from "../pages/DetailsCard";
import PokemonCard from "../components/HomeComp/PokemonCard";

const Api = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );
  const initialUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

  const fetchPokemons = async (url: string = initialUrl) => {
    try {
      const { results, next } = await getPokemonList(url);

      const pokemonDetailsPromises = results.map(async (pokemon) => {
        const response = await fetchPokemonDetails(pokemon.url);
        return response;
      });

      const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);

      setPokemonList((prevPokemonList) =>
        url === initialUrl
          ? [...pokemonDetailsResponses]
          : [...prevPokemonList, ...pokemonDetailsResponses]
      );
      setNextUrl(next);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  const handleLoadMore = () => {
    if (nextUrl) {
      fetchPokemons(nextUrl);
    }
  };

  const handlePokemonClick = (selectedPokemon: PokemonDetails) => {
    setSelectedPokemon(selectedPokemon);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      {!selectedPokemon && (
        <>
          {pokemonList.map((pokemon, index) => (
            <div key={index}>
              <button onClick={() => handlePokemonClick(pokemon)}>
                <PokemonCard pokemon={pokemon} />
              </button>
            </div>
          ))}
          {nextUrl && <button onClick={handleLoadMore}>Load More</button>}
        </>
      )}
      {selectedPokemon && <DetailsCard selectedPokemon={selectedPokemon} />}
    </div>
  );
};

export default Api;
