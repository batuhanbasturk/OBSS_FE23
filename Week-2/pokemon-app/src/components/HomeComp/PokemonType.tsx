import { PokemonDetails } from "../../types";

const PokemonType = ({ pokemon: { types } }: { pokemon: PokemonDetails }) => {
  return (
    <>
      {types.map((type) => (
        <div key={type.type.name}>
          <div>{type.type.name}</div>
        </div>
      ))}
    </>
  );
};

export default PokemonType;
