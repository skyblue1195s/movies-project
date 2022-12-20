import { useState, useEffect } from "react";
import { List } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks/useDispatch";
import { girdConfig } from "@helper/constants";
import { useQuery } from "@hooks/useQuery";
import MovieCard from "@components/MovieCard";
import { IMovie, IPagination } from "@interfaces/Movies.interface";
import { moviesService } from "@services/Movies";

export default function ViewAllMovies() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [params, setParams] = useState<IPagination>({
    page: 1,
    total_results: 20,
  });
  const movieReducers = useAppSelector((state) => state.movieReducers);

  const query = useQuery();

  useEffect(() => {
    if (!query.get("search")) {
      switch (query.get("list")) {
        case "playing":
          setData(
            movieReducers?.playingNow,
            movieReducers.paginationPlayingNow,
            movieReducers.loadingPlayingNow
          );
          break;
        case "rated":
          setData(
            movieReducers?.topRated,
            movieReducers.paginationRated,
            movieReducers.loadingRated
          );
          break;
        default:
          setData(
            movieReducers?.movies,
            movieReducers.paginationPopular,
            movieReducers.loadingPopular
          );
          break;
      }
    } else {
      setData(
        movieReducers?.searchMovies,
        movieReducers.pagination,
        movieReducers.loadingSearch
      );
    }
  }, [movieReducers, query]);

  useEffect(() => {
    !query.get("search") ? getListMovies(1) : searchMovies(1);
  }, []);

  useEffect(() => {
    if (query.get("search")) {
      searchMovies(1);
    }
  }, [query.get("search")]);

  const setData = (
    movies: IMovie[],
    params: IPagination,
    loadingData: boolean
  ) => {
    setMovies(movies);
    setParams(params);
    setLoading(loadingData);
  };

  const searchMovies = (page: number) => {
    const param = `page=${page}&query=${query.get("search")}`;
    dispatch(moviesService.searchMovies(param));
  };

  const getListMovies = (page: number) => {
    switch (query.get("list")) {
      case "playing":
        dispatch(moviesService.getListPlayingNowMovies(page));
        break;
      case "rated":
        dispatch(moviesService.getListTopRatedMovies(page));
        break;

      default:
        dispatch(moviesService.getListPopularMovies(page));
        break;
    }
  };

  const onPageChange = (page: number) => {
    !query.get("search") ? getListMovies(page) : searchMovies(page);
  };

  return (
    <List
      grid={girdConfig}
      dataSource={movies}
      loading={loading}
      pagination={{
        defaultCurrent: params.page,
        total: params.total_results,
        defaultPageSize: 20,
        showSizeChanger: false,
        onChange: onPageChange,
      }}
      renderItem={(item: IMovie) => (
        <List.Item className="h-full">
          <MovieCard
            title={item.title}
            id={item.id}
            overview={item.overview}
            poster_path={item.poster_path}
          />
        </List.Item>
      )}
    />
  );
}
