import { PokemonDetails } from "../../types";
import PokemonType from "./PokemonType";
import Pokemon from "./Pokemon";

const PokemonCard = ({ pokemon }: { pokemon: PokemonDetails }) => {
  return (
    <div>
      <Pokemon pokemon={pokemon} />
      <PokemonType pokemon={pokemon} />
    </div>
  );
};

export default PokemonCard;
