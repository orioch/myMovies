import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import CastList from "../components/CastList";
import Slider from "../components/Slider";
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
  useEffect(() => {
    if (logo == "") {
      setLoading(false);
    }
  }, [logo]);
  // if the fetch didnt end

  const finishLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, Math.floor(Math.random() * 1000));
  };
  return (
    <React.Fragment>
      <div className={`loading ${loading}`}>
        <ColorRing />
      </div>
      {movie ? (
        <div
          className={loading ? "page hidden" : "page"}
          style={backgroundStyle(movie.backdrop_path)}
        >
          {logo == "" ? (
            <h1 className="logo">{movie.name || movie.title}</h1>
          ) : (
            <img onLoad={finishLoading} className="logo" src={logo} />
          )}
          <div className="overview">{movie.overview}</div>
          <button
            onClick={() => setTrailerModal(!trailerModal)}
            className="play-btn"
          >
            Watch Trailer
          </button>
          {loading ? null : <Slider listType={type} listName="cast" id={id} />}
          <Video
            id={trailerId}
            isOpen={trailerModal}
            handleOpen={setTrailerModal}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
}
