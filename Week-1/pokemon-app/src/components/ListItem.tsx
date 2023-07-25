import React from "react";

const ListItem = ({ stat }: any) => {
  return (
    <li key={stat.stat.name}>
      {stat.stat.name}: {stat.base_stat}
    </li>
  );
};

export default ListItem;
