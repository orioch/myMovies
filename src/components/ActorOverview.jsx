import React from "react";
import ReactShowMoreText from "react-show-more-text";

export default function ActorOverview({ person }) {
  return (
    <div className="overview-column">
      <h1>{person.name}</h1>
      <h2>Biography</h2>
      <ReactShowMoreText
        lines={8}
        more="Show more"
        less="Show less"
        expanded={false}
      >
        <p>{person.biography}</p>
      </ReactShowMoreText>
    </div>
  );
}
