import { combineReducers } from "redux";
import movieReducers from "./movie/movie.slices";

const reducers = combineReducers({
  movieReducers,
});

export default reducers;
