import { IMovies } from "@interfaces/Movies.interface";
import { createSlice } from "@reduxjs/toolkit";
import { moviesService } from "@services/Movies";

const initialState = {
  loadingPopular: true,
  loadingPlayingNow: true,
  loadingRated: true,
  loading: true,
  loadingSearch: false,
  paginationPopular: { page: 1, total_results: 0 },
  paginationPlayingNow: { page: 1, total_results: 0 },
  paginationRated: { page: 1, total_results: 0 },
  searchMovies: [],
  pagination: { page: 1, total_results: 0 },
  playingNow: [],
  movies: [],
  topRated: [],
  movieDetails: {},
};

const movieSlice = createSlice({
  name: "movieReducers",
  initialState: initialState as IMovies,
  extraReducers(builder) {
    builder
      .addCase(moviesService.getListPopularMovies.pending, (state) => {
        state.loadingPopular = true;
      })
      .addCase(
        moviesService.getListPopularMovies.fulfilled,
        (state, action) => {
          state.loadingPopular = false;
          state.movies = action.payload.data ? action.payload.data : [];
          state.paginationPopular = action.payload.meta || {};
        }
      )
      .addCase(moviesService.getListPopularMovies.rejected, (state) => {
        state.loadingPopular = false;
      })
      .addCase(moviesService.getListPlayingNowMovies.pending, (state) => {
        state.loadingPlayingNow = true;
      })
      .addCase(
        moviesService.getListPlayingNowMovies.fulfilled,
        (state, action) => {
          state.loadingPlayingNow = false;
          state.playingNow = action.payload.data ? action.payload.data : [];
          state.paginationPlayingNow = action.payload.meta || {};
        }
      )
      .addCase(moviesService.getListPlayingNowMovies.rejected, (state) => {
        state.loadingPlayingNow = false;
      })
      .addCase(moviesService.getListTopRatedMovies.pending, (state) => {
        state.loadingRated = true;
      })
      .addCase(
        moviesService.getListTopRatedMovies.fulfilled,
        (state, action) => {
          state.loadingRated = false;
          state.topRated = action.payload.data ? action.payload.data : [];
          state.paginationRated = action.payload.meta || {};
        }
      )
      .addCase(moviesService.getListTopRatedMovies.rejected, (state) => {
        state.loadingRated = false;
      })
      .addCase(moviesService.searchMovies.pending, (state) => {
        state.loadingSearch = true;
      })
      .addCase(moviesService.searchMovies.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.pagination = action.payload.meta || {};
        state.searchMovies = action.payload ? action.payload.data : {};
      })
      .addCase(moviesService.searchMovies.rejected, (state) => {
        state.loadingSearch = false;
      })
      .addCase(moviesService.getMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(moviesService.getMovieDetails.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.movieDetails = action.payload ? action.payload.data : {};
      })
      .addCase(moviesService.getMovieDetails.rejected, (state) => {
        state.loading = false;
      });
  },
  reducers: {
    clearMovieDetail: (state) => {
      state.movieDetails = {};
    },
  },
});
export const { clearMovieDetail } = movieSlice.actions;
export default movieSlice.reducer;
