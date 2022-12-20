import { convertToHours } from "@helper/utils";
import { Skeleton, Tag } from "antd";

export default function CardLoading() {
  const movieDetails = {
    title: "title",
    release_date: "2022-06-17",
    runtime: 70,
    tagline: "",
    overview: "",
    genres: [{ name: "action" }],
  };
  return (
    <Skeleton active>
      <div className="text-white absolute top-16 left-32">
        <h1 className="text-white text-4xl">{movieDetails.title}</h1>
        <div className="flex">
          <span>
            {new Date(movieDetails.release_date || "").getFullYear()} |
          </span>
          <span className="pr-1 pl-1">
            {convertToHours(movieDetails.runtime)} |
          </span>
          <span>{movieDetails.tagline}</span>
        </div>
        <div className="description w-1/3 text-lg">{movieDetails.overview}</div>
        <div className="tag mt-4">
          {movieDetails.genres?.map((item, index) => (
            <Tag key={index} color="blue" className="text-base">
              {item.name}
            </Tag>
          ))}
        </div>
      </div>
    </Skeleton>
  );
}
