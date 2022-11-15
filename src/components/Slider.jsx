import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchList } from "./utils/api";
import "../css/slider.css";

export default function Slider({ listType, listName }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetchList(listType, listName, setList);
  }, []);

  return (
    <div className="slider">
      {list.map((item) => (
        <div key={item.id} className="card">
          <img
            className="poster"
            src={"https://image.tmdb.org/t/p/original" + item.poster_path}
          />
        </div>
      ))}
    </div>
  );
}
