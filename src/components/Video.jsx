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
    <div className={`modal${isOpen ? " on" : " off"}`}>
      <button onClick={closeModal} className="close-btn">
        x
      </button>
      <YouTube onReady={_onReady} videoId={id} opts={opts} />
    </div>
  );
}
