import { Stats } from "../../types";

const StatsCard = ({ stat }: { stat: Stats }) => {
  return (
    <li key={stat.stat.name}>
      {stat.stat.name}: {stat.base_stat}
    </li>
  );
};

export default StatsCard;
