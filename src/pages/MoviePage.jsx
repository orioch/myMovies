import React from "react";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  let id = useParams().id;
  return <div>MoviePage {id}</div>;
}
