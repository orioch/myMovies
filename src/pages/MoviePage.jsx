import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CastList from "../components/CastList";
import {
  fetchActors,
  fetchLogo,
  fetchMovie,
  fetchTrailer,
  imgUrl,
} from "../components/utils/api";
import { backgroundStyle } from "../components/utils/styling";
import Video from "../components/Video";
import "../css/moviePage.css";
import LoadingPage from "./LoadingPage";
export default function MoviePage({ type }) {
  let id = useParams().id;
  const [movie, setMovie] = useState(undefined);
  const [logo, setLogo] = useState(undefined);
  const [trailerId, setTrailerId] = useState("");
  const [trailerModal, setTrailerModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie(type, id, setMovie);
    fetchLogo(type, id, setLogo);
    fetchTrailer(type, id, setTrailerId);
  }, []);

  if (loading) return <LoadingPage />;
  return (
    <div className="page" style={backgroundStyle(movie.backdrop_path)}>
      <img className="logo" src={logo} />
      <div className="overview">{movie.overview}</div>
      <button
        onClick={() => setTrailerModal(!trailerModal)}
        className="play-btn"
      >
        Watch Trailer
      </button>
      <CastList type={type} id={id} />
      <Video
        id={trailerId}
        isOpen={trailerModal}
        handleOpen={setTrailerModal}
      />
    </div>
  );
}
