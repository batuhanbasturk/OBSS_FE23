import React from "react";

const Details = ({ selectedPokemon }: any) => {
  return (
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
          <ListItem key={stat.stat.name} stat={stat} />
        ))}
      </ul>
      <img
        src={selectedPokemon.sprites.front_default}
        alt={selectedPokemon.name}
      />
    </div>
  );
};

export default Details;
