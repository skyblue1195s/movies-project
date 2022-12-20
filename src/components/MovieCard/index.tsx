import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import { clearMovieDetail } from "@features/movie/movie.slices";
import { IMovie } from "@interfaces/Movies.interface";
import { IMAGE_SIZE } from "@helper/constants";
import { useAppDispatch } from "@hooks/useDispatch";
import LazyImage from "@components/LazyLoadingImage";
import NoImage from "@assets/images/no-image.jpg";
import "./movieCard.css";

function MovieCard(item: IMovie) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { Meta } = Card;
  const imagesUrl = `${process.env.REACT_APP_IMAGE_URL}/${IMAGE_SIZE[200]}${item.poster_path}`;

  const handlerClick = () => {
    dispatch(clearMovieDetail());
    navigate(`/title/${item.id}`);
  };
  return (
    <Card
      hoverable={true}
      className="w-full"
      onClick={handlerClick}
      cover={
        <LazyImage
          className="w-full h-[20rem] object-cover"
          src={item.poster_path ? imagesUrl : NoImage}
          alt={item.title}
        />
      }
    >
      <Meta
        title={item.title}
        description={item.overview}
        className="text-truncate h-24"
      />
    </Card>
  );
}
export default memo(MovieCard);
