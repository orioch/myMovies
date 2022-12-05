import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Slider from "../components/Slider";
import { getList } from "../redux/features/listSlice";

/**
 * The Main page component is the default page of the app that displays a list of popular movies,
 * top-rated movies, and popular TV shows.
 */
export default function Main() {
  const dispatch = useDispatch(); // Use the useDispatch hook to get the dispatch function

  // Use the useEffect hook to dispatch the getList action creator when the component is mounted
  useEffect(() => {
    dispatch(getList({ listType: "movie", listName: "popular" }));
    dispatch(getList({ listType: "movie", listName: "top_rated" }));
    dispatch(getList({ listType: "movie", listName: "upcoming" }));
    dispatch(getList({ listType: "tv", listName: "popular" }));
    dispatch(getList({ listType: "tv", listName: "top_rated" }));
    dispatch(getList({ listType: "tv", listName: "on_the_air" }));
  }, []);

  return (
    <div>
      {/* Use the Slider component to display a list of popular movies */}
      <Slider listType="movie" listName="popular" />
      {/* Use the Slider component to display a list of top-rated movies */}
      <Slider listType="movie" listName="top_rated" />
      {/* Use the Slider component to display a list of popular TV shows */}
      <Slider listType="tv" listName="popular" />
    </div>
  );
}
