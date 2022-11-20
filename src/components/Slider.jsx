import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchActorCredits, fetchList } from "./utils/api";
import "../css/slider.css";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import SliderCard from "./SliderCard";

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
