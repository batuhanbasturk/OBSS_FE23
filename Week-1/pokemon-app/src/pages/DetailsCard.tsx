import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetails } from "../types";
import { fetchPokemonDetails } from "../services/pokemon.services";
import {
  PokemonInfoCard,
  PokemonImg,
  PokemonStatsCard,
  PokemonTypes,
} from "./details";

const DetailsCard = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchSelectedPokemon = async () => {
      try {
        const response = await fetchPokemonDetails(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        setSelectedPokemon(response);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    };
    fetchSelectedPokemon();
  }, [id]);

  if (!selectedPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {selectedPokemon.name} #{selectedPokemon.id}
      </h1>
      <PokemonImg selectedPokemon={selectedPokemon} />
      <PokemonInfoCard selectedPokemon={selectedPokemon} />

      <h2>Types:</h2>
      <PokemonTypes selectedPokemon={selectedPokemon} />
      <h3>Stats:</h3>
      <PokemonStatsCard selectedPokemon={selectedPokemon} />
    </div>
  );
};

export default DetailsCard;
