import { http } from "@helper/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getListPopularMovies = createAsyncThunk(
  "movies/getListPopularMovies",
  async (page: number, { rejectWithValue }) => {
    return http
      .get(
        `movie/popular?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&page=${page || 1}&pageSize=1000`
      )
      .then(({ results, page, total_results }: any) => {
        return { data: results, meta: { page, total_results } };
      })
      .catch((err) => rejectWithValue(err.response));
  }
);

const getListPlayingNowMovies = createAsyncThunk(
  "movies/getListPlayingNowMovies",
  async (page: number, { rejectWithValue }) => {
    return http
      .get(
        `movie/now_playing?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&page=${page || 1}`
      )
      .then(({ results, page, total_results }: any) => {
        return { data: results, meta: { page, total_results } };
      })
      .catch((err) => rejectWithValue(err.response));
  }
);

const getListTopRatedMovies = createAsyncThunk(
  "movies/getListTopRatedMovies",
  async (page: number, { rejectWithValue }) => {
    return http
      .get(
        `movie/top_rated?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&page=?${page || 1}`
      )
      .then(({ results, page, total_results }: any) => {
        return { data: results, meta: { page, total_results } };
      })
      .catch((err) => rejectWithValue(err.response));
  }
);

const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query: string, { rejectWithValue }) => {
    return http
      .get(
        `search/movie?api_key=${process.env.REACT_APP_API_KEY}&include_adult=true&language=en-US&${query}`
      )
      .then(({ results, page, total_results }: any) => {
        return { data: results, meta: { page, total_results } };
      })
      .catch((err) => rejectWithValue(err.response));
  }
);

const getMovieDetails = createAsyncThunk(
  "movies/getMovieDetails",
  async (movieId: string, { rejectWithValue }) =>
    http
      .get(
        `movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((rs: any) => {
        return { data: rs };
      })
      .catch((err) => rejectWithValue(err.response))
);

export const moviesService = {
  getListPopularMovies,
  getMovieDetails,
  getListPlayingNowMovies,
  getListTopRatedMovies,
  searchMovies,
};
