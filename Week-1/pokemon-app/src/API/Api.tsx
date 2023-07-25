import { useEffect, useState } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonList {
  results: Pokemon[];
  next: string | null;
}

interface Types {
  type: Type;
}
interface Type {
  name: string;
  url: string;
}

interface Stat {
  name: string;
}

interface Stats {
  base_stat: number;
  stat: Stat;
}

interface Img {
  front_default: string;
}

interface PokemonDetails {
  types: Types[];
  height: number;
  weight: number;
  stats: Stats[];
  id: number;
  sprites: Img;
  name: string;
}

const Api = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async (
    url: string = "https://pokeapi.co/api/v2/pokemon/"
  ) => {
    const response = await axios.get<PokemonList>(url);
    const updatedPokemonList = response.data.results.map((pokemon) => ({
      name: pokemon.name,
      url: pokemon.url,
    }));

    if (!nextUrl) {
      setPokemonList(updatedPokemonList);
    } else {
      setPokemonList((prevList) => [...prevList, ...updatedPokemonList]);
    }
    setNextUrl(response.data.next);
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

      {selectedPokemon && (
        <div>
          <h2>Details for {selectedPokemon.name}</h2>
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          <h3>Types:</h3>
          <ul>
            {selectedPokemon.types.map((type) => (
              <li key={type.type.name}>{type.type.name}</li>
            ))}
          </ul>
          <h3>Stats:</h3>
          <ul>
            {selectedPokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
        </div>
      )}
    </div>
  );
};

export default Api;
