import { useEffect, useState } from "react";
import { PokemonDetails } from "../types";

import PokemonCard from "../components/HomeComp/PokemonCard";
import { Link } from "react-router-dom";

import fetchPokemonsAPI from "./fetchPokemons";

const Api = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const fetchPokemons = (next?: string) => {
    fetchPokemonsAPI(next)
      .then(({ results, next }) => {
        setPokemonList([...pokemonList, ...results]);
        setNextUrl(next);
      })
      .catch(console.log);
  };

  const handleLoadMore = () => {
    nextUrl && fetchPokemons(nextUrl);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <>
      {pokemonList.map((pokemon) => (
        <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
          <div style={{ border: "1px solid hotpink" }}>
            <PokemonCard pokemon={pokemon} />
          </div>
        </Link>
      ))}
      {nextUrl && <button onClick={handleLoadMore}>Load More</button>}
    </>
  );
};
export default Api;
