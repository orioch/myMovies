import React from "react";
import YouTube from "react-youtube";

export default function Video({ id }) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div>
      <YouTube videoId={id} opts={opts} />
    </div>
  );
}
