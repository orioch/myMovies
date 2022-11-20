import React, { useEffect, useState } from "react";
import { fetchActors, imgUrl } from "./utils/api";
import "../css/actorList.css";
import { Link } from "react-router-dom";

export default function CastList({ type, id }) {
  const [actorsList, setActorsList] = useState([]);
  useEffect(() => {
    fetchActors(type, id, setActorsList, 10);
  }, []);

  return (
    <div className="cast-list">
      {actorsList.map((actor) => (
        <Link to={"/actor/" + actor.id} key={actor.id} className="actor-card">
          <img className="actor-img" src={imgUrl + actor.profile_path} />
          <div className="actor-title">{actor.name}</div>
        </Link>
      ))}
      <div className="actor-card">show more</div>
    </div>
  );
}
