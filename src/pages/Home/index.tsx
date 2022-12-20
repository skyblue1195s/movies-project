import React, { useEffect } from "react";
import SwiperComponent from "@components/Swiper";
import { useAppDispatch, useAppSelector } from "@hooks/useDispatch";
import { moviesService } from "@services/Movies";
import { Link } from "react-router-dom";

export function Home() {
  const { movieReducers } = useAppSelector((selector) => selector);
  const dispatch = useAppDispatch();
  console.log(movieReducers);

  useEffect(() => {
    getListMovies();
  }, []);

  const getListMovies = () => {
    dispatch(moviesService.getListPopularMovies(1));
    dispatch(moviesService.getListPlayingNowMovies(1));
    dispatch(moviesService.getListTopRatedMovies(1));
  };
  return (
    <div className="block">
      <section className="mt-[40px] relative">
        <div className="flex justify-between">
          <h2 className="text-white">Popular on Netflix</h2>
          <Link to="/movies">See all</Link>
        </div>
        <SwiperComponent movies={movieReducers.movies} />
      </section>
      <section className="mt-[40px] relative">
        <div className="flex justify-between">
          <h2 className="text-white">Playing Now on Netflix</h2>
          <Link to="/movies?list=playing">See all</Link>
        </div>
        <SwiperComponent movies={movieReducers.playingNow} />
      </section>
      <section className="mt-[40px] prelative">
        <div className="flex justify-between">
          <h2 className="text-white">Top Rated on Netflix</h2>
          <Link to="/movies?list=rated">See all</Link>
        </div>
        <SwiperComponent movies={movieReducers.topRated} />
      </section>
    </div>
  );
}
