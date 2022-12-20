export interface IMovie {
  id?: string;
  title?: string;
  overview?: string;
  poster_path?: string;
  tagline?: string;
  runtime?: number;
  vote_average?: number;
  release_date?: string;
  genres?: IGenres[];
}

interface IGenres {
  id?: string;
  name?: string;
}

export interface IMovieData {
  movies: IMovie[];
}

export interface IMovies {
  loadingPopular: boolean;
  loadingPlayingNow: boolean;
  loadingRated: boolean;
  loading: boolean;
  loadingSearch: boolean;
  movies: IMovie[] | [];
  playingNow: IMovie[] | [];
  topRated: IMovie[] | [];
  movieDetails: IMovie;
  searchMovies: IMovie[];
  pagination: IPagination;
  paginationPopular: IPagination;
  paginationPlayingNow: IPagination;
  paginationRated: IPagination;
}

export interface IPagination {
  page?: number;
  total_results?: number;
}
