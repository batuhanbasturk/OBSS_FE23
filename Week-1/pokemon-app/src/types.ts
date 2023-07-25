export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonList {
  results: Pokemon[];
  next: string | null;
}

export interface Types {
  type: Type;
}
export interface Type {
  name: string;
  url: string;
}

export interface Stat {
  name: string;
}

export interface Stats {
  base_stat: number;
  stat: Stat;
}

export interface Img {
  front_default: string;
}

export interface PokemonDetails {
  types: Types[];
  height: number;
  weight: number;
  stats: Stats[];
  id: number;
  sprites: Img;
  name: string;
}
