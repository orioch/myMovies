import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLogo, fetchMovie, imgUrl } from "../components/utils/api";
import { backgroundStyle } from "../components/utils/styling";
import "../css/moviePage.css";
export default function MoviePage({ type }) {
  let id = useParams().id;
  const [movie, setMovie] = useState(undefined);
  const [logo, setLogo] = useState(undefined);
  useEffect(() => {
    fetchMovie(type, id, setMovie);
    fetchLogo(type, id, setLogo);
  }, []);
  if (!movie) return <div>loading</div>;
  return (
    <div className="page" style={backgroundStyle(movie.backdrop_path)}>
      <img className="logo" src={logo} />
      <div className="overview">{movie.overview}</div>
      <button className="play-btn">Play Trailer</button>
    </div>
  );
}
