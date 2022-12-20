import { Home } from "@pages/Home";
import { MovieDetails } from "@pages/MovieDetails";
import ViewAllMovies from "@pages/ViewAllMovies";
export const main = [
  { path: "/", component: <Home /> },
  { path: "/title/:id", component: <MovieDetails /> },
  { path: "/movies", component: <ViewAllMovies /> },
];
