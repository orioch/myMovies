import React, { useEffect, useState } from "react";
import { fetchActors, imgUrl } from "./utils/api";
import "../css/actorList.css";

export default function CastList({ type, id }) {
  const [actorsList, setActorsList] = useState([]);
  useEffect(() => {
    fetchActors(type, id, setActorsList, 10);
  }, []);

  return (
    <div className="cast-list">
      {actorsList.map((actor) => (
        <div key={actor.id} className="actor-card">
          <div className="actor-title">{actor.name}</div>
          <img className="actor-img" src={imgUrl + actor.profile_path} />
        </div>
      ))}
    </div>
  );
}
