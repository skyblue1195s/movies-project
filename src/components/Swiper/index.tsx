import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./swiper.css";
import MovieCard from "@components/MovieCard";
import { IMovieData } from "@interfaces/Movies.interface";
import CardLoading from "@components/CardLoading";

export default function SwiperComponent({ movies }: IMovieData) {
  const renderSwiper = () => {
    return movies.map((item, index) => (
      <SwiperSlide key={index}>
        <MovieCard
          title={item.title}
          id={item.id}
          overview={item.overview}
          poster_path={item.poster_path}
        />
      </SwiperSlide>
    ));
  };

  const renderLoading = () => {
    return Array(5)
      .fill(0)
      .map((item, index) => (
        <SwiperSlide key={index}>
          <CardLoading />
        </SwiperSlide>
      ));
  };

  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={10}
      slidesPerGroup={5}
      loop={true}
      loopFillGroupWithBlank={true}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {movies.length > 0 ? renderSwiper() : renderLoading()}
    </Swiper>
  );
}
