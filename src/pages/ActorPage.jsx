import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActorInfoCard from "../components/ActorInfoCard";
import ActorOverview from "../components/ActorOverview";
import Slider from "../components/Slider";
import {
  fetchExternalLinks,
  fetchPerson,
  imgUrl,
} from "../components/utils/api";
import "../css/actorPage.css";

export default function ActorPage() {
  const [person, setPerson] = useState(undefined);
  const [externalLinks, setExternalLinks] = useState([]);
  let id = useParams().id;

  useEffect(() => {
    fetchPerson(id, setPerson);
    fetchExternalLinks("person", id, setExternalLinks);
  }, []);

  if (!person) return <div>loading</div>;
  return (
    <div className="actor-page">
      <ActorInfoCard person={person} externalLinks={externalLinks} />
      <ActorOverview person={person} />
    </div>
  );
}
