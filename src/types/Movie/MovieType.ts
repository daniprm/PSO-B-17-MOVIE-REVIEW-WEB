interface PaginationType {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
}

export interface MovieType {
  id: string;
  created_at: string;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  poster_url: string;
  description: string;
  director: string;
  actors_id: number;
  genres_id: number;
}

export interface MovieResponseType extends PaginationType {
  data: MovieType[];
}
