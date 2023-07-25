import React from "react";
import { PokemonDetails } from "../types";
import {
  PokemonInfoCard,
  PokemonImg,
  PokemonStatsCard,
  PokemonTypes,
} from "./details";

const DetailsCard = ({
  selectedPokemon,
}: {
  selectedPokemon: PokemonDetails;
}) => {
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
