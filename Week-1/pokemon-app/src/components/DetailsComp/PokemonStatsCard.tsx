import React from "react";
import { PokemonDetails } from "../../types";
import StatsCard from "./StatsCard";
const PokemonStatsCard = ({
  selectedPokemon: { stats },
}: {
  selectedPokemon: PokemonDetails;
}) => {
  return (
    <div>
      <ul>
        {stats.map((stat) => (
          <StatsCard key={stat.stat.name} stat={stat} />
        ))}
      </ul>
    </div>
  );
};

export default PokemonStatsCard;
