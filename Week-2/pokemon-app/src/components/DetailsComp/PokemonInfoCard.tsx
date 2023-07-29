import { PokemonDetails } from "../../types";

const PokemonInfoCard = ({
  selectedPokemon: { height, weight, abilities },
}: {
  selectedPokemon: PokemonDetails;
}) => {
  return (
    <div>
      <div>
        <p>Height: {height}</p>
        <p>Weight: {weight}</p>
      </div>
      <div>
        <h3>Abilities:</h3>
        <div>
          {abilities.map((ability) =>
            !ability.is_hidden ? (
              <div key={ability.ability.name}>{ability.ability.name}</div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonInfoCard;
