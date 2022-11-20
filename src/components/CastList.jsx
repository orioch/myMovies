import React, { useEffect, useState } from "react";
import { fetchActors, imgUrl } from "./utils/api";
import "../css/actorList.css";
import { Link } from "react-router-dom";
import CastListCard from "./CastListCard";

export default function CastList({ type, id }) {
  const [actorsList, setActorsList] = useState([]);
  useEffect(() => {
    fetchActors(type, id, setActorsList, 10);
  }, []);

  return (
    <div className="cast-list">
      {actorsList.map((actor, index) => (
        <CastListCard actor={actor} index={index} />
      ))}
      <div className="actor-card">show more</div>
    </div>
  );
}
