import React from "react";
import { PokemonDetails } from "../../types";

const PokemonTypes = ({
  selectedPokemon: { types },
}: {
  selectedPokemon: PokemonDetails;
}) => {
  return (
    <div>
      <ul>
        {types.map((type) => (
          <li key={type.type.name}>{type.type.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonTypes;
