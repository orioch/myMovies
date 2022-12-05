import React, { useLayoutEffect, useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchActorCredits, fetchActors, fetchList } from "./utils/api";
import "../css/slider.css";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import SliderCard from "./SliderCard";
import {
  CarouselProvider,
  Slider as CarouselSlider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import CastListCard from "./CastListCard";

/**
 * This Component takes in 3 props: listType, id, and listName.
 * It uses the listType and listName props to make an API call
 * to fetch a list of items to be displayed in a slider.
 * If the listType is "person" and the listName is "cast", the component will make
 * a call to fetch the cast of a movie or TV show.
 * Otherwise, the component will make a call to fetch a list of movies or
 * TV shows depending on the listType and listName props.
 * The id prop is used to specify the specific movie or TV show to
 * fetch the cast for when the listType is "person" and the listName is "cast".
 */
export default function Slider({ listType, id, listName }) {
  const containerRef = useRef(null); // This useRef reference the Slider container so we can access its width.

  const [width, setWidth] = useState(0); // This state stores the width of the container element. It is initially set to 0 and then updated every time the width changing.
  const [list, setList] = useState([]); // This state stores the list of items to be displayed in the slider. It is initially an empty array and then updated with data from the API when the component is mounted.

  /**
   *  This useEffect is responsible for fetching data from the API when the copmpoennt mounted
   */
  useEffect(() => {
    if (listType == "person") {
      fetchActorCredits(listName, "cast", id, setList, 10);
    } else if (listName == "cast") {
      fetchActors(listType, id, setList, 10);
    } else fetchList(listType, listName, setList);
  }, []);

  /**
   * This useEffect runs a callback function that updates the width state
   * to the current width of the container element.
   * It does this by using the containerRef variable,
   * which is a reference to the container element,
   * and accessing its offsetWidth property.
   */
  useLayoutEffect(() => {
    setWidth(containerRef.current.offsetWidth);
  }, [containerRef]);

  /**
   * This useEffect adds an event listener to the resize event on the window object.
   * When this event is triggered, the width state is updated to the current width
   * of the container element.
   */
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setWidth(containerRef.current.offsetWidth);
      },
      false
    );
  }, []);

  return (
    <CarouselProvider
      className={listName == "cast" ? "cast slider" : "slider"}
      naturalSlideWidth={80}
      naturalSlideHeight={listName == "cast" ? 260 : 120}
      totalSlides={list.length}
      visibleSlides={Math.round(width / 200)}
      step={Math.round(width / 200)}
    >
      <div className="slider-container" ref={containerRef}>
        <CarouselSlider>
          {list.map((item, index) => (
            <Slide index={index}>
              {listName == "cast" ? (
                <CastListCard actor={item} index={index} />
              ) : (
                <SliderCard
                  listType={listType == "person" ? item.media_type : listType}
                  index={index}
                  item={item}
                />
              )}
            </Slide>
          ))}
        </CarouselSlider>
      </div>
      <ButtonBack className="arrow-btn left">
        <AiFillCaretLeft />
      </ButtonBack>
      <ButtonNext className="arrow-btn right">
        <AiFillCaretRight />
      </ButtonNext>
    </CarouselProvider>
  );
  return (
    <div className="slider">
      {list.map((item, index) => (
        <SliderCard
          listType={listType == "person" ? item.media_type : listType}
          index={index}
          item={item}
        />
      ))}
    </div>
  );
}
