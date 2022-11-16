import React, { useState } from "react";
import YouTube from "react-youtube";

export default function Video({ id, isOpen, handleOpen }) {
  const [playerElement, setPlayerElement] = useState(null);
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const _onReady = (event) => {
    setPlayerElement(event);
  };
  const closeModal = () => {
    handleOpen(false);
    playerElement.target.pauseVideo();
  };
  return (
    <div onClick={closeModal} className={`modal${isOpen ? " on" : " off"}`}>
      <YouTube onReady={_onReady} videoId={id} opts={opts} />
    </div>
  );
}
