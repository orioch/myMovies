import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Slider from "../components/Slider";
import { getList } from "../redux/features/listSlice";

export default function Main() {
  const dispatch = useDispatch();
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
      <Slider listType="movie" listName="popular" />
      <Slider listType="movie" listName="top_rated" />
      <Slider listType="tv" listName="popular" />
    </div>
  );
}
