import { PokemonDetails } from "../../types";
import PokemonType from "./PokemonType";
import Pokemon from "./Pokemon";

const PokemonCard = ({ pokemon }: { pokemon: PokemonDetails }) => {
  return (
    <>
      <Pokemon pokemon={pokemon} />
      <PokemonType pokemon={pokemon} />
    </>
  );
};

export default PokemonCard;
