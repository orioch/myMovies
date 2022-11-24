import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchActorCredits, fetchList } from "./utils/api";
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

export default function Slider({ listType, id, listName }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      if (listType == "person") {
        fetchActorCredits(listName, "cast", id, setList, 10);
      } else fetchList(listType, listName, setList);
    }, 0);
  }, []);
  return (
    <CarouselProvider
      className="slider"
      naturalSlideWidth={80}
      naturalSlideHeight={130}
      totalSlides={list.length}
      visibleSlides={7}
      step={7}
    >
      <CarouselSlider>
        {list.map((item, index) => (
          <Slide index={index}>
            <SliderCard
              listType={listType == "person" ? item.media_type : listType}
              index={index}
              item={item}
            />
          </Slide>
        ))}
      </CarouselSlider>
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
