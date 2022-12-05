import React, { useState } from "react";
import YouTube from "react-youtube";

/**
 * Video component
 *
 * @param {string} id - The YouTube video id
 * @param {boolean} isOpen - A flag indicating whether the video modal is open or not
 * @param {function} handleOpen - A callback function to handle opening or closing the video modal
 */
export default function Video({ id, isOpen, handleOpen }) {
  const [playerElement, setPlayerElement] = useState(null); // This state hold the YouTube player object

  // Set YouTube player options
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  // A callback function to be called when the YouTube player is ready
  const _onReady = (event) => {
    // Set the YouTube player object to state
    setPlayerElement(event);
  };

  // A function to close the video modal and pause the video
  const closeModal = () => {
    handleOpen(false);
    playerElement.target.pauseVideo();
  };

  // Render the video modal and YouTube player
  return (
    <div className={`modal${isOpen ? " on" : " off"}`}>
      <button onClick={closeModal} className="close-btn">
        x
      </button>
      <YouTube onReady={_onReady} videoId={id} opts={opts} />
    </div>
  );
}
