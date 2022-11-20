import React, { useState } from "react";
import { Link } from "react-router-dom";
import { imgUrl } from "./utils/api";

export default function ({ actor, index }) {
  const [display, setDisplay] = useState(false);
  const displayAnimation = () => {
    setTimeout(() => {
      setDisplay(true);
    }, Math.floor(Math.random() * 500) + index * 500);
  };
  return (
    <Link
      to={"/actor/" + actor.id}
      key={actor.id}
      className={`card${display ? " display" : " hide"}`}
    >
      <img
        onLoad={displayAnimation}
        className="actor-img"
        src={imgUrl + actor.profile_path}
      />
      <div className="actor-title">
        {actor.name}
        <br /> {actor.character}
      </div>
    </Link>
  );
}
