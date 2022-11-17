import React from "react";
import { useParams } from "react-router-dom";

export default function ActorPage() {
  let id = useParams().id;
  return <div>ActorPage {id}</div>;
}
