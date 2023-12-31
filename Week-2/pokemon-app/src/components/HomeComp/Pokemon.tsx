import React from "react";
import { PokemonDetails } from "../../types";
const Pokemon = ({
  pokemon: { sprites, id, name },
}: {
  pokemon: PokemonDetails;
}) => {
  return (
    <>
      <div>
        <img src={sprites.front_default} alt={name} />
      </div>
      <div>#{id}</div>
      <div>{name}</div>
    </>
  );
};

export default Pokemon;
