import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * This component renders a Card for the Slider,
 * when click on the card, it navigates to a page showing more details about the item.
 * It contains an img element that displays the poster of the item.
 * When the img element finishes loading, displayAnimation is called.
 */
export default function SliderCard({ listType, item, index }) {
  const [display, setDisplay] = useState(false); // this state determines whether the item is displayed or hidden.

  /**
   * This function display the compponent with opacity transition.
   * there is a delay before displaying the component according to the index,
   * to prevent all components from displaying at once
   *  */
  const displayAnimation = () => {
    setTimeout(() => {
      setDisplay(true);
    }, Math.floor(Math.random() * 500) + index * 500); // delay is random to make the loading process appear more realistic.
  };
  return (
    <Link
      to={`/${listType}/${item.id}`}
      key={item.id}
      className={`card${display ? " display" : " hide"}`}
    >
      <img
        onLoad={displayAnimation}
        className="poster"
        src={"https://image.tmdb.org/t/p/original" + item.poster_path}
      />
    </Link>
  );
}
