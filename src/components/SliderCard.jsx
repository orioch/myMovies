import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SliderCard({ listType, item, index }) {
  const [display, setDisplay] = useState(false);
  const displayAnimation = () => {
    setTimeout(() => {
      setDisplay(true);
    }, Math.floor(Math.random() * 500) + index * 500);
  };
  return (
    <Link
      to={`/${listType}/${item.id}`}
      key={item.id}
      className={`card${display ? " display" : " hide"}`}
    >
      <img
        onLoad={displayAnimation}
        className="poster"
        src={"https://image.tmdb.org/t/p/original" + item.poster_path}
      />
    </Link>
  );
}
