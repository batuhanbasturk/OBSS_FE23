import { PokemonDetails } from "../../types";

const PokemonType = ({ pokemon: { types } }: { pokemon: PokemonDetails }) => {
  return (
    <div>
      <div>
        {types.map((type) => (
          <div key={type.type.name}>
            <div>{type.type.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonType;
