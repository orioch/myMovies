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

/**
 * This component is a page that shows details about a movie or a TV show.
 * It fetches the movie or TV show information, its logo, trailer, and a list of its cast members.
 * It also displays a slider that shows the cast of the movie / TV show.
 *
 * @param {string} type - The type of the page. It should be either "movie" or "tv".
 */
export default function MoviePage({ type }) {
  let id = useParams().id;
  const [movie, setMovie] = useState(undefined);
  const [logo, setLogo] = useState(undefined);
  const [trailerId, setTrailerId] = useState("");
  const [trailerModal, setTrailerModal] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * This useEffect hook is executed when the component is mounted.
   * It calls the fetchMovie function to fetch the details of the movie or TV show,
   * fetchLogo to fetch the logo of the movie or TV show,
   * and fetchTrailer to fetch the trailer of the movie or TV show.
   * The values returned by these functions are then stored
   * in the movie, logo, and trailerId states, respectively.
   */
  useEffect(() => {
    fetchMovie(type, id, setMovie);
    fetchLogo(type, id, setLogo);
    fetchTrailer(type, id, setTrailerId);
  }, []);
  /**
   * This useEffect hook is used to set the loading state to false
   * when the logo of the movie or TV show has finished loading.
   * This is used to show a loading spinner on the page
   * until all the data has been fetched and displayed.
   */
  useEffect(() => {
    if (logo == "") {
      setLoading(false);
    }
  }, [logo]);

  /**
   * The finishLoading function is used to mark the end of the loading process.
   * It sets the loading state to false,
   * indicating that the page is no longer loading.
   * It also adds a random delay to the loading process,
   * making the loading process appear more realistic.
   * This function is called whenever the logo image is successfully loaded.
   */
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
