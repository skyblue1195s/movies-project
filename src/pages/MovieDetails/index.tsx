import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useDispatch";
import { moviesService } from "@services/Movies";
import { useParams } from "react-router-dom";
import { Tag } from "antd";
import { convertToHours } from "@helper/utils";
import LazyImage from "@components/LazyLoadingImage";
import CardLoading from "@components/CardLoading";
import { IMAGE_SIZE } from "@helper/constants";

export function MovieDetails() {
  const { movieReducers } = useAppSelector((selector) => selector);
  const { movieDetails, loading } = movieReducers;
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const imageUrl = `${process.env.REACT_APP_IMAGE_URL}/original`;
  const smallImageUrl = `${process.env.REACT_APP_IMAGE_URL}/${IMAGE_SIZE[200]}`;

  useEffect(() => {
    getMovieDetails();
  }, []);

  const getMovieDetails = () => {
    dispatch(moviesService.getMovieDetails(id || ""));
  };
  return (
    <div className="relative h-[70vh] flex justify-end">
      {!movieDetails.id ? (
        <CardLoading />
      ) : (
        <>
          <LazyImage
            src={`${imageUrl}${movieDetails.poster_path}`}
            alt={movieDetails.title}
            loadingImage={`${smallImageUrl}${movieDetails.poster_path}`}
            className="w-full h-[70vh] object-contain float-right"
          />
          <div className="text-white absolute top-16 left-32">
            <h1 className="text-white text-4xl w-1/3">{movieDetails.title}</h1>
            <div className="flex">
              <span>
                {new Date(movieDetails.release_date || "").getFullYear()} |
              </span>
              <span className="pr-1 pl-1">
                {convertToHours(movieDetails.runtime)} |
              </span>
              <span>{movieDetails.tagline}</span>
            </div>
            <div className="description w-1/3 text-lg">
              {movieDetails.overview}
            </div>
            <div className="tag mt-4">
              {movieDetails.genres?.map((item, index) => (
                <Tag key={index} color="blue" className="text-base">
                  {item.name}
                </Tag>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
