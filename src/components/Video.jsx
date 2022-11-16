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

<<<<<<< Updated upstream
  return (
    <div>
      <YouTube videoId={id} opts={opts} />
=======
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
>>>>>>> Stashed changes
    </div>
  );
}
