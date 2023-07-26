import { PokemonDetails } from "../../types";

const PokemonImg = ({
  selectedPokemon: { sprites, name },
}: {
  selectedPokemon: PokemonDetails;
}) => {
  return (
    <div>
      <img src={sprites.front_default} alt={name} />
    </div>
  );
};

export default PokemonImg;
